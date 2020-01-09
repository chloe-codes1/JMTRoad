package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.OwnerVO;

@Mapper
public interface ManagementOwnerMapper {

	List<OwnerVO> ownerStoreList();
}
