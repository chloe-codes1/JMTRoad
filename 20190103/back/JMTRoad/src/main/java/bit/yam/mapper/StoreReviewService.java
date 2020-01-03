package bit.yam.mapper;

import java.util.List;

import bit.yam.config.StoreReview;

public interface StoreReviewService {

    StoreReview saveReview(StoreReview storereviewNo);
    List<StoreReview> findAll();
    void delete(int storereviewNo);

    StoreReview findOne(int storereviewNo);

    StoreReview findById(int ownerNo);

}