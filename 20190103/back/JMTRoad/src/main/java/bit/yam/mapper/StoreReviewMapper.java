package bit.yam.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.config.StoreReview;

@Mapper
public interface StoreReviewMapper {
	
	StoreReview storereviewcount(StoreReview storereview);
	StoreReview starCount(StoreReview storereview);
	StoreReview storelikeCount(StoreReview storereview);
	List<StoreReview> storereviewOwnerNo(int ownerNO);
}
