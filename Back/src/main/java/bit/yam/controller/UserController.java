package bit.yam.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bit.yam.bean.OwnerVO;
import bit.yam.bean.UserVO;
import bit.yam.model.UserDto;
import bit.yam.service.UserMapper;
import bit.yam.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
//@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserMapper userMapper;
	
	// User Insert
	@PostMapping("/users")
	public UserVO saveUser(@RequestBody UserVO user) {
		//System.out.println("들어온 유저 => " + user);
		//System.out.println("userId => " + user.getUserID());
		
		UserVO loggedUser = userMapper.lookupUserByID(user.getUserID()); //조회
		//System.out.println(loggedUser); 뉴비면 null이 찍힘
		
		if(loggedUser == null) { //와 하도 안하니 까먹.. java에서 boolean비교 ==			
			userMapper.userInsert(user); //생성
			System.out.println(userMapper.lookupUserByID(user.getUserID()));
			System.out.println("신입받아라!");
		} else {
			System.out.println("기존 회원입니다.");
		}
		
		UserVO JMTUser = userMapper.lookupUserByID(user.getUserID());
		//System.out.println("if문 빠져나온 JMTUser => " + JMTUser);
		return JMTUser;
	}

	@GetMapping("/{nickname}")
	public UserVO getUserNickname(@PathVariable String nickname) {
		
		UserVO JMTUser = userMapper.lookupUserByNickname(nickname);
		System.out.println("닉네임 전송할게유");
		
		return JMTUser;
	}
	
	// User 전체 목록 출력
	@GetMapping("/users")
	public List<UserVO> listUser() {
		return userService.findAll();
	}

	// User 1명 검색 by userNo
	@GetMapping("/users/{id}")
	public UserVO getOne(@PathVariable int id) {
		return userService.findById(id);
	}

	// User Update
	@PutMapping("/users/{id}")
	public UserDto update(@RequestBody UserDto userDto) {
		return userService.update(userDto);
	}

	// User Delete  -> 우리는 이거 말고 userStatus를 11 (활동) => 13(탈퇴)로 바꾸는 Update를 함
	@DeleteMapping("/users/{id}")
	public void delete(@PathVariable int id) {
		userService.delete(id);
	}

	
	// 회원 탈퇴 -> Delete하는게 아니라 userStatus를 11 (활동) => 13(탈퇴)로 바꾸는 Update
	@PostMapping("/users/withdrawUser/{userNo}")
	public void withdrawUser(@PathVariable int userNo) {
		userMapper.withdrawUser(userNo);
	}
	
	
	public static final String fileUrl = "/Final-Project/";
	
	// [ Profile Image Upload -multi-file ]
	
//	@PostMapping("/uploadProfileImage/{userNo}")
//	public Map<String, Object> uploadProfileImage(@PathVariable int userNo, MultipartHttpServletRequest multi, HttpServletRequest request)
//			throws Exception {
//		
//		Map<String, Object> map = new HashMap<String, Object>();
//		List<MultipartFile> fileList = multi.getFiles("file");
//
//		for (MultipartFile mf : fileList) {
//			String fileName = mf.getOriginalFilename();
//			long size = mf.getSize();
//			System.out.println("file size => " + size);
//
//			if (size != 0) {
//
//				String fileNameExtension = FilenameUtils.getExtension(fileName).toLowerCase();
//				File destinationFile;
//				String destinationFileName;
//				do {
//					destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + fileNameExtension;
//					destinationFile = new File(request.getServletContext().getRealPath(fileUrl) + destinationFileName);
//					System.out.println(destinationFile);
//				} while (destinationFile.exists());
//				destinationFile.getParentFile().mkdirs();
//				mf.transferTo(destinationFile);
//
//				userService.uploadProfileImage(userNo, fileUrl+fileName);
//				
//				map.put("fileName", fileUrl+fileName);
//
//			}
//		}
//		return map;
//	}
	
	// [ Profile Image Upload -single file ]
	@PostMapping("/users/uploadProfileImage/{userNo}")
	public Map<String, Object> uploadProfileImage(@PathVariable int userNo, @RequestParam("file") MultipartFile file, HttpServletRequest request)
			throws Exception {
		
			Map<String, Object> map = new HashMap<String, Object>();
			
			long size = file.getSize();
			System.out.println("file 크기는 ?! => " + size);
			
			String fileName = file.getOriginalFilename();
			String fileNameExtension = FilenameUtils.getExtension(fileName).toLowerCase();
			File destinationFile;
			String destinationFileName;
		
			do {
				destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + fileNameExtension;
				destinationFile = new File(request.getServletContext().getRealPath(fileUrl) + destinationFileName);
				
				System.out.println(destinationFile);
				
			} while (destinationFile.exists());
			
			destinationFile.getParentFile().mkdirs();
			file.transferTo(destinationFile);
			
			userService.uploadProfileImage(userNo, fileUrl+destinationFileName);
			map.put("fileName", fileUrl+fileName);

		return map;
	}
	
	// 좋아요한 음식점 목록 출력
	@GetMapping("likedStoreList/{userNo}")
	public List<OwnerVO> likedStoreList (@PathVariable int userNo) {
		List<OwnerVO> list = userMapper.getLikedStoreList(userNo);
		return list;
	}
	
	// 내가 팔로우 하는 유저 목록 출력
	@GetMapping("followingList/{userNo}")
	public List<UserVO> followingList (@PathVariable int userNo) {
		List<UserVO> list = userMapper.followingList(userNo);
		return list;
	}

	// 나를 팔로우 하는 유저 목록 출력
	@GetMapping("followerList/{userNo}")
	public List<UserVO> followerList (@PathVariable int userNo) {
		List<UserVO> list = userMapper.followerList(userNo);
		return list;
	}
	
	// 팔로우 하기
	@PostMapping("follow")
	public void follow (@RequestParam("userNo") int userNo, @RequestParam("targetNo") int targetNo) {
		userMapper.follow(userNo, targetNo);
	}
	
	// 팔로우 취소
	@PostMapping("unFollow")
	public void unFollow (@RequestParam("userNo") int userNo, @RequestParam("targetNo") int targetNo) {
		userMapper.unFollow(userNo, targetNo);
	}
}