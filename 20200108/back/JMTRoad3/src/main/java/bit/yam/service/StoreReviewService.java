package bit.yam.service;

import java.util.List;

import bit.yam.bean.StoreReview;

public interface StoreReviewService {

    StoreReview saveReview(StoreReview storereviewNo);
    
    List<StoreReview> findAll();
    
    void delete(int storereviewNo);

    StoreReview findOne(int storereviewNo);

    StoreReview findById(int ownerNo);

}