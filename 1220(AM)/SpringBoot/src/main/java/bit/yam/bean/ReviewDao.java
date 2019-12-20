package bit.yam.bean;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bit.yam.config.StoreReview;

@Repository
public interface ReviewDao extends CrudRepository<StoreReview, Integer> {

    StoreReview findBystorereviewNo(int storereviewNo);
}