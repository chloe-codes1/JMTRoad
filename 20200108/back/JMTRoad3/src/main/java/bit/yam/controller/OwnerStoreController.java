package bit.yam.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bit.yam.bean.OwnerStore;
import bit.yam.bean.StoreLikeVO;
import bit.yam.service.OwnerMapper;
import bit.yam.service.OwnerStoreService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/owners")
public class OwnerStoreController {

	@Autowired
	OwnerMapper mapper;
	
	
	String name;
	
	@Autowired
	private OwnerStoreService ownerService;


	@PostMapping
	public void saveUser(@RequestBody OwnerStore user) {
		
		 mapper.reg(user);
	}

	@GetMapping
	public List<OwnerStore> listUser() {
		
		return mapper.storeList();
	}

    @GetMapping("/{ownerNo}")
    public OwnerStore getOne(@PathVariable int ownerNo){
    	System.out.println(ownerNo);
        return mapper.ownerselect(ownerNo);
    }
    
	// 가게 좋아요
	@PostMapping("/storeLike")
	public void storeLike(@RequestParam("ownerNo") int ownerNo, @RequestParam("userNo") int userNo) {
		mapper.storeLike(ownerNo, userNo);
	};
	
	//가게 좋아요취소
	@PostMapping("/storeLikeDel")
	public void storeLikeDel(@RequestParam("ownerNo") int ownerNo, @RequestParam("userNo") int userNo) {
		mapper.storeLikeDel(ownerNo, userNo);
	};

	@GetMapping("/loadstoreLike/{userNo}/{ownerNo}")
	public StoreLikeVO loadstorelike(@PathVariable int userNo,@PathVariable int ownerNo) {
		
		System.out.println("userno"+userNo);
		System.out.println("ownerNo"+ownerNo);
		
		return mapper.loadstorelike(userNo,ownerNo);
	}
	
	@PutMapping("/{ownerNo}")
	public void update(@RequestBody OwnerStore ownerstore) {
		
		System.out.println("번호"+ownerstore.getOwnerNo());
		
		System.out.println("update :: "+name);
		
		ownerstore.setMenuImg("img/"+name);
		
		System.out.println("음식스타일 : " + ownerstore.getCuisine());
		System.out.println(ownerstore.getTel());
		System.out.println(ownerstore.getAddress());
		System.out.println(ownerstore.getStoreName());
		System.out.println(ownerstore.getOpeningHours());
		System.out.println(ownerstore.getMainMenu());
			
		if(ownerstore.getCuisine().equals("한식")) {
			ownerstore.setCuisine("51");
		}
		else if(ownerstore.getCuisine().equals("양식")) {
			ownerstore.setCuisine("52");
		}
		else if(ownerstore.getCuisine().equals("중식")) {
			ownerstore.setCuisine("53");
		}
		else if(ownerstore.getCuisine().equals("일식")) {
			ownerstore.setCuisine("54");
		}
		else if(ownerstore.getCuisine().equals("동남아식")) {
			ownerstore.setCuisine("55");
		}
		else if(ownerstore.getCuisine().equals("뷔페식")) {
			ownerstore.setCuisine("56");
		}
		
		
		mapper.update(ownerstore);
	}
	
	@GetMapping("/login/{ownerID}/{password}")
	public OwnerStore ownerLogin(OwnerStore ownerstore) {
		
		
		System.out.println("ID"+ownerstore.getOwnerID());
		
		System.out.println("pw"+ownerstore.getPassword());
				
		return mapper.login(ownerstore);
		
	}
		
	@PostMapping("/files")
	public void savefile(@RequestParam("file") MultipartFile file) {
		
		System.out.printf("File name=%s, size=%s\n", file.getOriginalFilename(),file.getSize());
		
		File filetosave = new File("E:\\final\\front\\public\\img\\"+file.getOriginalFilename());
		
		name = file.getOriginalFilename();
		
		try {
			file.transferTo(filetosave);
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
}
