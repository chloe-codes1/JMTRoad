package bit.yam.mapper;

import java.util.List;

import bit.yam.config.StoreInfo;
import bit.yam.config.StoreInfoDto;

public interface StoreInfoService {

    StoreInfo save(StoreInfoDto ownerNo);
    List<StoreInfo> findAll();
    void delete(int ownerNo);

    StoreInfo findOne(int ownerNo);

    StoreInfo findById(int ownerNo);

    StoreInfoDto update(StoreInfoDto ownerNo);
}