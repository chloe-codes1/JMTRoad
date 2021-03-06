package com.devglan.controller;


import com.devglan.model.OwnerStore;
import com.devglan.service.OwnerStoreService;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;


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
