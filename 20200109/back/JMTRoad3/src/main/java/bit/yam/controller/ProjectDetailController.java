package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.ProjectDetailVO;
import bit.yam.service.ProjectDetailMapper;

@RestController
public class ProjectDetailController {
	
	@Autowired 
	ProjectDetailMapper projectDetailMapper;
	
	//프로젝트1개에 대한 목록
	@GetMapping("/projectDetail/{projectNo}")
	public List<ProjectDetailVO> listProjectDetail(@PathVariable int projectNo){
		return projectDetailMapper.listProjectDetail(projectNo);
	}
	// 프로젝트 상세내용수정
	@PostMapping("/projectDetail/update")
	public void updateProjectDetail(@RequestBody ProjectDetailVO projectDetail) {
		projectDetailMapper.updateProjectDetail(projectDetail);
	}
	
	//프로젝트 상세내용삭제
	@PostMapping("/projectDetail/delete")
	public void deleteProjectDetail(@RequestParam("projectNo") int projectNo, @RequestParam("ownerNo") int ownerNo) {
		projectDetailMapper.deleteProjectDetail(projectNo, ownerNo);
		
	}
	
	

}
