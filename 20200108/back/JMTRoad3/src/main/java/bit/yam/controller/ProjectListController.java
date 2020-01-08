package bit.yam.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.ProjectVO;
import bit.yam.service.ProjectListMapper;

@RestController
public class ProjectListController {

	@Autowired
	private ProjectListMapper projectMapper;
	
	@GetMapping("myProjectList/{userNo}")
	public List<ProjectVO> myProjectList(@PathVariable int userNo){
		List<ProjectVO> list = projectMapper.getMyProjectList(userNo);
		return list;
	}
	
	@GetMapping("savedProjectList/{userNo}")
	public List<ProjectVO> savedProjectList(@PathVariable int userNo){
		List<ProjectVO> list = projectMapper.getSavedProjectList(userNo);
		return list;
	}
	
	@GetMapping("likedProjectList/{userNo}")
	public List<ProjectVO> likedProjectList (@PathVariable int userNo){
		List<ProjectVO> list = projectMapper.getLikedProjectList(userNo);
		return list;
	}
	
//	묘음추가
	@GetMapping("/list")
	public List<ProjectVO> projectList(){	
		List<ProjectVO> list = projectMapper.projectList();
		return list;
	}
	
	@GetMapping("/main/hot")
	public List<ProjectVO> hotProjectList(){	
		List<ProjectVO> hotlist = new ArrayList<ProjectVO>();
		hotlist =projectMapper.hotProjectList();
		return hotlist;
	}
	@GetMapping("/main/new")
	public List<ProjectVO> newProjectList(){
		List<ProjectVO> newlist = new ArrayList<ProjectVO>();
		newlist =projectMapper.newProjectList();	
		return newlist;
	}
	
}