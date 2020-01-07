package bit.yam.bean;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewDao extends CrudRepository<bit.yam.bean.StoreReview, Integer> {

    StoreReview findBystorereviewNo(int storereviewNo);
}