package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.StoreReviewVO;
import bit.yam.service.StoreReviewMapper;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class StoreReviewController {

	@Autowired
	private StoreReviewMapper storeReviewMapper;
	
	@GetMapping("/storeReview/{ownerNo}")
	public List<StoreReviewVO> listSTReview(@PathVariable int ownerNo){
		
		storeReviewMapper.getStoreReviewList(ownerNo);
		
		System.out.println("잘 찍히나?" + storeReviewMapper.getStoreReviewList(ownerNo));
		
		return storeReviewMapper.getStoreReviewList(ownerNo);
	}
}
