package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.ProjectCommentVO;
import bit.yam.service.ProjectCommentMapper;

@RestController
public class ProjectCommentController {
	@Autowired 
	ProjectCommentMapper projectCommentMapper;
	
	//댓긂목록
	@GetMapping("/projectComment/{projectNo}")
	public List<ProjectCommentVO> projectCommentList(@PathVariable int projectNo){
		return projectCommentMapper.projectCommentList(projectNo);
	}
	
	// 댓글작성
	@PostMapping("/projectComment/insert")
	public void insertProjectComment(@RequestBody ProjectCommentVO projectComment) {
		System.out.println(projectComment.getContent());
		System.out.println(projectComment.toString());
		projectCommentMapper.insertProjectComment(projectComment);
	}
	
	// 댓글수정
	@PostMapping("/projectComment/update")
	public void updateProjectComment(@RequestParam("projectCommentNo")int projectCommentNo, @RequestParam("content") String content ) {
		projectCommentMapper.updateProjectComment(projectCommentNo, content);
	}
	
	// 댓글삭제
	@PostMapping("/projectComment/delete")
	public void deleteProjectComment(@RequestParam("projectCommentNo") int projectCommentNo) {
		projectCommentMapper.deleteProjectComment(projectCommentNo);
		
	}
	

}
