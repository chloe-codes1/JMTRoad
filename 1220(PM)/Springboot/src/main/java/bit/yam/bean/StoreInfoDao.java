package bit.yam.bean;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bit.yam.config.StoreInfo;

@Repository
public interface StoreInfoDao extends CrudRepository<StoreInfo, Integer> {

    StoreInfo findByOwnerNo(int ownerNo);
}