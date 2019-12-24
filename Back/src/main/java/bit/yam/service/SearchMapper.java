package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.OwnerVO;

@Mapper
public interface SearchMapper {
	List<OwnerVO> searchByName (String storeName);
	List<OwnerVO> searchByCuisine (int cuisine);
	List<OwnerVO> searchBothOfThem (String storeName, int cuisine);
}
