package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MapController {

	@RequestMapping("kakaoMap")
	public void kakaoMap() {

	}

	@RequestMapping("geoLocation")
	public void geoLocation() {

	}

	@RequestMapping("keywordSearch")
	public void keywordSearch() {

	}

	@RequestMapping("categorySearch")
	public void categorySearch() {

	}

	@RequestMapping("addressSearch")
	public void addressSearch() {

	}

	@RequestMapping("multiMarker")
	public void multiMarker() {
	}

	@RequestMapping("mapTest")
	public void mapTest() {

	}

	@RequestMapping("TmapTest1")
	public String TmapTest1() {

		return "TmapAPI_Test01";
	}

	@RequestMapping("TmapTest2")
	public String TmapTest2() {

		return "TmapAPI_Test02";
	}

	@RequestMapping("TmapTest3")
	public String TmapTest3() {
		
		return "TmapAPI_Test03";
	}
	
	
	@RequestMapping("TmapV2Test1")
	public String TmapV2Test1() {

		return "TmapAPI_V2_Test01";
	}

	@RequestMapping("TmapV2Test2")
	public String TmapV2Test2() {

		return "TmapAPI_V2_Test02";
	}

	
	@RequestMapping("TmapV2Test3")
	public String TmapV2Test3() {

		return "TmapAPI_V2_Test03";
	}
}
