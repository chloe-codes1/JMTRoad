package bit.yam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import bit.yam.config.OwnerStore;
import bit.yam.config.OwnerStoreDto;
import bit.yam.mapper.OwnerMapper;
import bit.yam.mapper.OwnerStoreService;

import java.io.File;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/owners")
public class OwnerStoreController {

	@Autowired
	OwnerMapper mapper;
	
	
//	String url="E:\\react\\store-info\\src\\Img\\";
	
	String name;
	
	@Autowired
	private OwnerStoreService ownerService;


	@PostMapping
	public OwnerStore saveUser(@RequestBody OwnerStore user) {
		
		return ownerService.save(user);
	}

	@GetMapping
	public List<OwnerStore> listUser() {
		
		
		return ownerService.findAll();
	}

    @GetMapping("/{ownerNo}")
    public OwnerStore getOne(@PathVariable int ownerNo){
    	System.out.println(ownerNo);
        return ownerService.findById(ownerNo);
    }

	@PutMapping("/{ownerNo}")
	public OwnerStoreDto update(@RequestBody OwnerStoreDto ownerstoredto) {
		
		System.out.println("update :: "+name);
		
		ownerstoredto.setMenuImg("img/"+name);
		
		return ownerService.update(ownerstoredto);
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
		
		File filetosave = new File("E:\\react\\final\\public\\img\\"+file.getOriginalFilename());
		
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
