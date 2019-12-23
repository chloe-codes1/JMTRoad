package bit.yam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import bit.yam.bean.UserVO;
import bit.yam.mapper.UserMapper;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserMapper userMapper;
	
	@PostMapping
	public UserVO insertUser(@RequestBody UserVO user) {
		
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
}
