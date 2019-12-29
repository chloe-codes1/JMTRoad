package com.devglan.controller;

import com.devglan.mapper.ownerMapper;
import com.devglan.model.OwnerStore;
import com.devglan.model.OwnerStoreDto;
import com.devglan.service.OwnerStoreService;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/owners")
public class OwnerStoreController {

	@Autowired
	ownerMapper mapper;
	
	@Autowired
	private OwnerStoreService ownerService;

	public static final String fileUrl = "/Final-Project/";

	@PostMapping
	public OwnerStore saveUser(@RequestBody OwnerStore user) {
		
		
//		System.out.println(user.getMenuImg());
		
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
	public OwnerStoreDto update(
			@RequestBody OwnerStoreDto ownerstoredto/* ,@RequestParam("menuImg") MultipartFile file */) {
		return ownerService.update(ownerstoredto);
	}
	
	@GetMapping("/login/{ownerID}/{password}")
	public OwnerStore ownerLogin(OwnerStore ownerstore) {

		return mapper.login(ownerstore);
		
	}
	
//	@PostMapping("/uploadImage/{ownerNo}")
//	public Map<String, Object> uploadProfileImage(@PathVariable int ownerNo, MultipartHttpServletRequest multi, HttpServletRequest request)
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
//				
//				mf.transferTo(destinationFile);
//
//				System.out.println(fileUrl+fileName);
//				
////				ownerService.save(userNo, fileUrl+fileName);
//				
//				map.put("fileName", fileUrl+fileName);
//
//			}
//		}
//		return map;
//	}
//	
//	

}
