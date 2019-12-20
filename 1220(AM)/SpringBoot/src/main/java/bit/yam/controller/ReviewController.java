package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.config.ApiResponse;
import bit.yam.config.StoreReview;
import bit.yam.config.StoreReviewDto;
import bit.yam.mapper.StoreReviewService;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/storereview")
public class ReviewController {

    @Autowired
    private StoreReviewService storeReview;

    @PostMapping("/saveReview")
    public ApiResponse<StoreReview> review(@RequestBody StoreReviewDto review){
        return new ApiResponse<>(HttpStatus.OK.value(), "reviews saved successfully.",storeReview.saveReview(review));
    }

    @GetMapping
    public ApiResponse<List<StoreReview>> listreview(){
        return new ApiResponse<>(HttpStatus.OK.value(), "reviews list fetched successfully.",storeReview.findAll());
    }

    @GetMapping("/{storereviewNo}")
    public ApiResponse<StoreReview> getOne(@PathVariable int storereviewNo){
        return new ApiResponse<>(HttpStatus.OK.value(), "reviews fetched successfully.",storeReview.findById(storereviewNo));
    }

    @DeleteMapping("/{storereviewNo}")
    public ApiResponse<Void> delete(@PathVariable int storereviewNo) {
        storeReview.delete(storereviewNo);
        return new ApiResponse<>(HttpStatus.OK.value(), "reviews deleted successfully.", null);
    }

}