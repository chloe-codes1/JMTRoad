package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.StoreReviewVO;

@Mapper
public interface StoreReviewMapper {

	List<StoreReviewVO> getStoreReviewList(int ownerNo);
}
