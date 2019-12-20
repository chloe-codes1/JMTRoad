package bit.yam.bean;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bit.yam.config.OwnerStore;

@Repository
public interface OwnerStoreDao extends CrudRepository<OwnerStore, Integer> {

    OwnerStore findBystName(String stName);
   
}
