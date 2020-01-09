package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.OwnerStore;
import bit.yam.bean.StoreReview;
import bit.yam.bean.StoreReviewVO;

@Mapper
public interface StoreReviewMapper {
	
	StoreReview storereviewcount(StoreReview storereview);
	StoreReview starCount(StoreReview storereview);
	StoreReview storelikeCount(StoreReview storereview);
	List<StoreReview> storereviewOwnerNo(int ownerNO);
	
	List<StoreReviewVO> getStoreReviewList(int ownerNo);
	OwnerStore getOwnerStore(int ownerNo);
}
