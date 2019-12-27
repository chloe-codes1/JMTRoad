package com.devglan.service;

import java.util.List;


import com.devglan.model.OwnerStore;
import com.devglan.model.OwnerStoreDto;

public interface OwnerStoreService {

	OwnerStore save(OwnerStore ownerstore);
	
	List<OwnerStore> findAll();

	OwnerStore findById(int ownerNo);
	
	OwnerStore findByownerNo(int ownerNo);

	OwnerStoreDto update(OwnerStoreDto ownerstoredto);

}
