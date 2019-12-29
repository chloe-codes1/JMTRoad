package com.devglan.dao;

import com.devglan.model.OwnerStore;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerStoreDao extends CrudRepository<OwnerStore, Integer> {

    OwnerStore findByStoreName(String StoreName);
    OwnerStore findByOwnerNo(int ownerNo);
   
}
