package bit.yam.mapper.Impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bit.yam.bean.StoreInfoDao;
import bit.yam.config.StoreInfo;
import bit.yam.mapper.StoreInfoService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@Service(value = "storeinfoService")
public class StoreInfoServiceImpl implements StoreInfoService {
	
	@Autowired
	private StoreInfoDao storeinfoDao;

	public List<StoreInfo> findAll() {
		List<StoreInfo> list = new ArrayList<>();
		storeinfoDao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(int ownerNo) {
		storeinfoDao.deleteById(ownerNo);
	}

	@Override
	public StoreInfo findOne(int ownerNo) {
		return storeinfoDao.findByOwnerNo(ownerNo);
	}

	@Override
	public StoreInfo findById(int ownerNo) {
		Optional<StoreInfo> optionalUser = storeinfoDao.findById(ownerNo);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

    @Override
    public StoreInfo update(StoreInfo StoreReview) {
        StoreInfo store = findById(StoreReview.getOwnerNo());
        if(store != null) {
            BeanUtils.copyProperties(StoreReview, store, "BRNo", "storeName");
            storeinfoDao.save(store);
        }
        return StoreReview;
    }

    @Override
    public StoreInfo save(StoreInfo storeinfo) {
	    StoreInfo newstoreinfo = new StoreInfo();
	    newstoreinfo.setOwnerNo(storeinfo.getOwnerNo());
	    newstoreinfo.setStoreName(storeinfo.getStoreName());
	    newstoreinfo.setBRNo(storeinfo.getBRNo());
	    newstoreinfo.setTel(storeinfo.getTel());
	    newstoreinfo.setAddress(storeinfo.getAddress());
	    newstoreinfo.setOpeningHours(storeinfo.getOpeningHours());
	    newstoreinfo.setCusine(storeinfo.getCusine());
	    newstoreinfo.setMenuImg(storeinfo.getMenuImg());
        return storeinfoDao.save(newstoreinfo);
    }

}
