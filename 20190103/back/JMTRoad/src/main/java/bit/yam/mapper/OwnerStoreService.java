package bit.yam.mapper;

import java.util.List;

import bit.yam.config.OwnerStore;
import bit.yam.config.OwnerStoreDto;

public interface OwnerStoreService {

	OwnerStore save(OwnerStore ownerstore);
	
	List<OwnerStore> findAll();

	OwnerStore findById(int ownerNo);
	
	OwnerStore findByownerNo(int ownerNo);

	OwnerStoreDto update(OwnerStoreDto ownerstoredto);

}
