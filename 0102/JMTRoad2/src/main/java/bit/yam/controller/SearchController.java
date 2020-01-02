package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.OwnerVO;
import bit.yam.bean.UserVO;
import bit.yam.service.SearchMapper;

@RestController
public class SearchController {

	@Autowired
	private SearchMapper searchMapper;
	
	// 음식점 이름으로 검색
	@GetMapping("searchByName/{storeName}")
	public List<OwnerVO> searchByName (@PathVariable String storeName){
		List<OwnerVO> list = searchMapper.searchByName(storeName);
		System.out.println(list);
		return list;
	}
	
	// 음식 종류로 검색
	@GetMapping("searchByCuisine/{cuisine}")
	public List<OwnerVO> searchByCuisine (@PathVariable int cuisine){
		List<OwnerVO> list = searchMapper.searchByCuisine(cuisine);
		return list;
	}
	
	// 음식점 이름 & 음식점 종류로 검색
	@GetMapping("searchBothOfThem/{storeName}/{cuisine}")
	public List<OwnerVO> searchBothOfThem (@PathVariable String storeName, @PathVariable int cuisine){
		List<OwnerVO> list = searchMapper.searchBothOfThem(storeName, cuisine);
		return list;
	}
	
	// User nickname으로 검색
	@GetMapping("searchUser/{nickname}")
	public List<UserVO> searchUser (@PathVariable String nickname){
		List<UserVO> list = searchMapper.searchUser(nickname);
		return list;
	}
}
