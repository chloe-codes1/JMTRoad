package com.devglan.service;

import java.util.List;

import com.devglan.model.Reserve;

public interface UserService {

	Reserve save(Reserve user);
	List<Reserve> findAll();
	void delete(int waitNO);

	Reserve findByOne(String uName);
	
	Reserve findById(int waitNO);

}
