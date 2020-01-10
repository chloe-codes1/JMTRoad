package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.EateryInfoVO;
import bit.yam.bean.OwnerStore;
import bit.yam.bean.StoreReviewVO;
import bit.yam.service.StoreReviewMapper;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class StoreReviewController {

	@Autowired
	private StoreReviewMapper storeReviewMapper;
	
	@GetMapping("/storeReview/{ownerNo}")
	public EateryInfoVO listSTReview(@PathVariable int ownerNo){
		
		storeReviewMapper.getStoreReviewList(ownerNo);
		System.out.println("잘 찍히나?" + storeReviewMapper.getStoreReviewList(ownerNo));

		//여기서부터 새로 작업
		List<StoreReviewVO> SRList = storeReviewMapper.getStoreReviewList(ownerNo);
		System.out.println(storeReviewMapper.getOwnerStore(ownerNo));
		
		OwnerStore store = storeReviewMapper.getOwnerStore(ownerNo);
		
		EateryInfoVO eateryInfo = new EateryInfoVO();
		eateryInfo.setStoreName(store.getStoreName());
		eateryInfo.setAddress(store.getAddress());
		eateryInfo.setTel(store.getTel());
		eateryInfo.setMainMenu(store.getMainMenu());
		eateryInfo.setSRList(SRList);
		
		System.out.println("메인메뉴 => " + store.getMainMenu());
		
		return eateryInfo;
	}
	
}
