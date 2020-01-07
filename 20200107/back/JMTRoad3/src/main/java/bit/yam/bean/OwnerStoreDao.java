package bit.yam.bean;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bit.yam.bean.OwnerStore;

@Repository
public interface OwnerStoreDao extends CrudRepository<OwnerStore, Integer> {

    OwnerStore findByStoreName(String StoreName);
    OwnerStore findByOwnerNo(int ownerNo);
   
}
