package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.config.StoreReview;
import bit.yam.mapper.ReviewMapper;
import bit.yam.mapper.StoreReviewMapper;
import bit.yam.mapper.StoreReviewService;


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
        return storeReview.saveReview(storereviewNo);
    }
    
    @GetMapping("/{ownerNo}")
	public List<StoreReview> storereviewOwnerNo(@PathVariable int ownerNo) {
		return storereviewmapper.storereviewOwnerNo(ownerNo);
	}


@DeleteMapping("/{storereviewNo}")
public void delete(@PathVariable int storereviewNo) {
    storeReview.delete(storereviewNo);
}

@GetMapping("/{storereviewNo}/{star}")
public StoreReview storereviewCount(StoreReview storereview) {

	return storereviewmapper.starCount(storereview);
	
}
    
    
//    @GetMapping
//    public List<StoreReview> listreview(){
//        return storeReview.findAll();
//    }
//
//    @GetMapping("/{ownerNo}")
//    public StoreReview getOne(@PathVariable int ownerNo){
//        return reviewmapper.ownerReviewList(ownerNo);
//    }
//
//    @DeleteMapping("/{storereviewNo}")
//    public void delete(@PathVariable int storereviewNo) {
//        storeReview.delete(storereviewNo);
//    }

}