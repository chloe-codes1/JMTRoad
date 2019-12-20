package com.devglan.dao;

import com.devglan.model.Reserve;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReserveDao extends CrudRepository<Reserve, Integer> {

    Reserve findByUsername(String uName);
   
}
