package bit.yam.service;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.StoreReview;

@Mapper
public interface ReviewMapper {
	
	StoreReview ownerReviewList(int ownerNo);

}
