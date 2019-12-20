package bit.yam.mapper;

import java.util.List;

import bit.yam.config.StoreReview;
import bit.yam.config.StoreReviewDto;

public interface StoreReviewService {

    StoreReview saveReview(StoreReviewDto storereviewNo);
    List<StoreReview> findAll();
    void delete(int storereviewNo);

    StoreReview findOne(int storereviewNo);

    StoreReview findById(int storereviewNo);

}