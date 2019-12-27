package bit.yam.mapper;

import java.util.List;

import bit.yam.config.StoreInfo;

public interface StoreInfoService {

    StoreInfo save(StoreInfo ownerNo);
    List<StoreInfo> findAll();
    void delete(int ownerNo);

    StoreInfo findOne(int ownerNo);

    StoreInfo findById(int ownerNo);

    StoreInfo update(StoreInfo ownerNo);
}