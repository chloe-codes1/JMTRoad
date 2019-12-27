package bit.yam.mapper;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.config.StoreReview;

@Mapper
public interface StoreReviewMapper {
	
	StoreReview storereviewcount(StoreReview storereview);

}
