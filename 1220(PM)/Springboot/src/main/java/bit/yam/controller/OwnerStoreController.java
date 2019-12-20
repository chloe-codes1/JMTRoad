package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bit.yam.config.OwnerStore;
import bit.yam.mapper.OwnerStoreService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/owner")
public class OwnerStoreController {

    @Autowired
    private OwnerStoreService userService;
    
    public static final String fileUrl = "/Final-Project/";
	
    @PostMapping
	public OwnerStore saveUser(@RequestBody OwnerStore user, /* @RequestParam("file") */ MultipartFile file){
    	
    	
        return userService.save(user, file);
    }

//    @PostMapping("/upload")
//	public Map<String, Object> uploadimg(@RequestParam("menuImg") MultipartFile file, HttpServletRequest request) throws IllegalStateException, IOException{
//    	Map<String, Object> map = new HashMap<String, Object>();
//    	
//    	System.out.println("test");
//    	
//    	long size = file.getSize();
//		System.out.println("file 크기는 ?! => " + size);
//		
//		String fileName = file.getOriginalFilename();
//		String fileNameExtension = FilenameUtils.getExtension(fileName).toLowerCase();
//		File destinationFile;
//		String destinationFileName;
//	
//		do {
//			destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + fileNameExtension;
//			destinationFile = new File(request.getServletContext().getRealPath(fileUrl) + destinationFileName);
//			
//			System.out.println(destinationFile);
//			
//		} while (destinationFile.exists());
//		
//		destinationFile.getParentFile().mkdirs();
//		file.transferTo(destinationFile);
//		
//		map.put("fileName", fileUrl+fileName);
//    	
//    	userService.save(user);
//    	return map;
//    }
    
    @GetMapping
    public List<OwnerStore> listUser(){
        return userService.findAll();
    }

//    @GetMapping("/{ownerNo}")
//    public OwnerStore getOne(@PathVariable int waitNO){
//        return userService.findById(waitNO);
//    }
    

    @DeleteMapping("/{ownerNo}")
    public Void delete(@PathVariable int waitNO) {
        userService.delete(waitNO);
        return null;
    }



}
