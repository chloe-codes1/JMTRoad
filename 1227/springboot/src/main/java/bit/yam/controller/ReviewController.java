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
import bit.yam.mapper.StoreReviewService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/storereview")
public class ReviewController {

    @Autowired
    private StoreReviewService storeReview;
    
    @PostMapping
    public StoreReview saveReview(@RequestBody StoreReview storereviewNo) {
        return storeReview.saveReview(storereviewNo);
    }
    
    @GetMapping
    public List<StoreReview> listreview(){
        return storeReview.findAll();
    }

    @GetMapping("/{storereviewNo}")
    public StoreReview getOne(@PathVariable int storereviewNo){
        return storeReview.findById(storereviewNo);
    }

    @DeleteMapping("/{storereviewNo}")
    public void delete(@PathVariable int storereviewNo) {
        storeReview.delete(storereviewNo);
    }

}