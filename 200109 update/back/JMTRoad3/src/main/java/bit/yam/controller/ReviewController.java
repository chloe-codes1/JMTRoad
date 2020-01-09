package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.StoreReview;
import bit.yam.service.StoreReviewMapper;
import bit.yam.service.StoreReviewService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/storereview")
public class ReviewController {

	@Autowired
	private StoreReviewService storeReview;

	@Autowired
	StoreReviewMapper storereviewmapper;

	@PostMapping
	public StoreReview saveReview(@RequestBody StoreReview storereviewNo) {
		
		System.out.println("rerererererere");
		
		return storeReview.saveReview(storereviewNo);
	}

	@GetMapping("/{ownerNo}")
	public List<StoreReview> storereviewOwnerNo(@PathVariable int ownerNo) {
		return storereviewmapper.storereviewOwnerNo(ownerNo);
	}

	@GetMapping("/{storereviewNo}/{star}")
	public StoreReview storereviewCount(StoreReview storereview) {

		return storereviewmapper.starCount(storereview);

	}

}