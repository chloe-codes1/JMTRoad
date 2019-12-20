package bit.yam.mapper.Impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bit.yam.bean.ReviewDao;
import bit.yam.config.StoreReview;
import bit.yam.config.StoreReviewDto;
import bit.yam.mapper.StoreReviewService;

@Transactional
@Service(value = "reviewService")
public class StoreReviewServiceImpl implements StoreReviewService {
	
	@Autowired
	private ReviewDao reviewDao;

	public List<StoreReview> findAll() {
		List<StoreReview> list = new ArrayList<>();
		reviewDao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(int storereviewNo) {
		reviewDao.deleteById(storereviewNo);
	}

	@Override
	public StoreReview findOne(int storereviewNo) {
		return reviewDao.findBystorereviewNo(storereviewNo);
	}

	@Override
	public StoreReview findById(int storereviewNo) {
		Optional<StoreReview> optionalUser = reviewDao.findById(storereviewNo);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

	@Override
	public StoreReview saveReview(StoreReviewDto storereviewNo) {
		StoreReview newReview = new StoreReview();
	    newReview.setStorereviewNo(storereviewNo.getStorereviewNo());
	    newReview.setNickname(storereviewNo.getNickname());
	    newReview.setUserNo(storereviewNo.getUserNo());
	    newReview.setOwnerNo(storereviewNo.getOwnerNo());
	    newReview.setStar(storereviewNo.getStar());
	    newReview.setContents(storereviewNo.getContents());
        return reviewDao.save(newReview);
	}
}
