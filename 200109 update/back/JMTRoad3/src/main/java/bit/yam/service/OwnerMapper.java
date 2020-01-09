package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.OwnerStore;

@Mapper
public interface OwnerMapper {

	void reg(OwnerStore ownerstore);
	
	void update(OwnerStore ownerstore);
	
	OwnerStore login(OwnerStore ownerstore);
	
	List<OwnerStore> storeList();
	
	OwnerStore ownerselect(int ownerNo);
	
	
	
}
