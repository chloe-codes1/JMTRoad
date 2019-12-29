package com.devglan.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.devglan.model.OwnerStore;


@Mapper
public interface ownerMapper {

	OwnerStore login(OwnerStore ownerstore);
	
	
	
}
