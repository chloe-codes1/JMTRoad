package com.devglan.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.devglan.model.OwnerStore;

public interface OwnerStoreService {

//	OwnerStore save(OwnerStore user);
	
	List<OwnerStore> findAll();
	
	void delete(int waitNO);

	OwnerStore findByOne(String uName);
	
	OwnerStore findById(int waitNO);

	OwnerStore save(OwnerStore ownerstore, MultipartFile file);

}
