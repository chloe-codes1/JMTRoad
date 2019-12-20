package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.config.ApiResponse;
import bit.yam.config.StoreInfo;
import bit.yam.config.StoreInfoDto;
import bit.yam.mapper.StoreInfoService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/storeinfoDao")
public class StoreInfoController {

    @Autowired
    private StoreInfoService storeinfoService;

    @PostMapping
    public ApiResponse<StoreInfo> saveUser(@RequestBody StoreInfoDto user){
        return new ApiResponse<>(HttpStatus.OK.value(), "StoreInfo saved successfully.",storeinfoService.save(user));
    }

    @GetMapping
    public ApiResponse<List<StoreInfo>> listUser(){
        return new ApiResponse<>(HttpStatus.OK.value(), "StoreInfo list fetched successfully.",storeinfoService.findAll());
    }

    @GetMapping("/{ownerNo}")
    public ApiResponse<StoreInfo> getOne(@PathVariable int ownerNo){
        return new ApiResponse<>(HttpStatus.OK.value(), "StoreInfo fetched successfully.",storeinfoService.findById(ownerNo));
    }

    @PutMapping("/{ownerNo}")
    public ApiResponse<StoreInfoDto> update(@RequestBody StoreInfoDto storeinfoDto) {
        return new ApiResponse<>(HttpStatus.OK.value(), "StoreInfo updated successfully.",storeinfoService.update(storeinfoDto));
    }

    @DeleteMapping("/{ownerNo}")
    public ApiResponse<Void> delete(@PathVariable int ownerNo) {
    	storeinfoService.delete(ownerNo);
        return new ApiResponse<>(HttpStatus.OK.value(), "StoreInfo deleted successfully.", null);
    }

}