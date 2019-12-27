package com.devglan.controller;

import com.devglan.mapper.ownerMapper;
import com.devglan.model.OwnerStore;
import com.devglan.model.OwnerStoreDto;
import com.devglan.service.OwnerStoreService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

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
		
		return ownerService.save(user);
	}

	@GetMapping
	public List<OwnerStore> listUser() {
		
		System.out.println("sksksksk");
		
		return ownerService.findAll();
	}

    @GetMapping("/{ownerNo}")
    public OwnerStore getOne(@PathVariable int ownerNo){
    	System.out.println(ownerNo);
        return ownerService.findById(ownerNo);
    }

	@PutMapping("/{ownerNo}")
	public OwnerStoreDto update(@RequestBody OwnerStoreDto ownerstoredto) {
		return ownerService.update(ownerstoredto);
	}
	
	@GetMapping("/login/{ownerID}/{password}")
	public OwnerStore ownerLogin(OwnerStore ownerstore) {
		
		
		System.out.println(ownerstore.getOwnerID());
		
		System.out.println(ownerstore.getPassword());
		
//		if(ownerstore)
		
		return mapper.login(ownerstore);
		
	}
	
	
	
//	@PostMapping("/login/test")
//	public OwnerStore ownerLogin(@RequestBody OwnerStore ownerstore) {
//		
//		
//		System.out.println(ownerstore.getOwnerID());
//		
//		System.out.println(ownerstore.getPassword());
//		
//		return mapper.login(ownerstore);
//	}
//	
}
