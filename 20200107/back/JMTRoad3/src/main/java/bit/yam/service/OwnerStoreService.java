package bit.yam.service;

import java.util.List;

import bit.yam.bean.OwnerStore;
import bit.yam.bean.OwnerStoreDto;

public interface OwnerStoreService {

	OwnerStore save(OwnerStore ownerstore);
	
	List<OwnerStore> findAll();

//	OwnerStore findById(int ownerNo);
	
	OwnerStore findByownerNo(int ownerNo);

	OwnerStoreDto update(OwnerStoreDto ownerstoredto);

}
