package bit.yam.mapper;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.config.OwnerStore;

@Mapper
public interface OwnerMapper {

	OwnerStore login(OwnerStore ownerstore);
	
	
	
}
