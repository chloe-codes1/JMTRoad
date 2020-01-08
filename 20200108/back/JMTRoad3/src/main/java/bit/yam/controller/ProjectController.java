package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.ExProjectDetailVO;
import bit.yam.bean.ExProjectVO;
import bit.yam.bean.ProjectDetailVO;
import bit.yam.bean.ProjectLikeVO;
import bit.yam.bean.ProjectVO;
import bit.yam.service.ProjectMapper;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ProjectController {

	@Autowired
	private ProjectMapper projectMapper;
	
	@PostMapping("/project")
	public void saveProject(@RequestBody ExProjectVO exProject) {
		
		/*
		System.out.println(exProject);
		System.out.println("userNo => " + exProject.getUserNo());
		System.out.println("title => " + exProject.getTitle());
		System.out.println("meetingDate => " + exProject.getMeetingDate());
		System.out.println("totalExpense => " + exProject.getTotalExpense());
		System.out.println("ProjectDetail => " + exProject.getProjectDetail());
		System.out.println();
		*/
		
		ProjectVO project = new ProjectVO();
		project.setUserNo(exProject.getUserNo());
		project.setTitle(exProject.getTitle());
		project.setMeetingDate(exProject.getMeetingDate());
		project.setTotalExpense(exProject.getTotalExpense());
		
		projectMapper.projectInsert(project);
		int projectNo = project.getProjectNo();
		
		List<ExProjectDetailVO> exPjDetail = exProject.getProjectDetail();
		
		for(int i = 0; i < exProject.getProjectDetail().size(); i++) {
			
			ProjectDetailVO pjDetail = new ProjectDetailVO();
			pjDetail.setProjectNo(projectNo);
			pjDetail.setRouteNo(exPjDetail.get(i).getRouteNo());
			pjDetail.setOwnerNo(exPjDetail.get(i).getOwnerNo());
			projectMapper.projectDetailInsert(pjDetail);
			
		}
		
	}
	
	//	묘음추가
	// 프로젝트 1개 조회
		@GetMapping("/list/{projectNo}")
		public ProjectVO selectProject(@PathVariable int projectNo) {	
			projectMapper.updateRead(projectNo);
			ProjectVO result = projectMapper.selectProject(projectNo);
			return result;
		}
		
		// 프로젝트 좋아요
		@PostMapping("/projectLike")
		public void projectLike(@RequestParam("projectNo") int projectNo, @RequestParam("userNo") int userNo) {
			projectMapper.projectLike(projectNo, userNo);
		};
		
		//프로젝트 좋아요취소
		@PostMapping("/projectLikeDel")
		public void projectLikeDel(@RequestParam("projectNo") int projectNo, @RequestParam("userNo") int userNo) {
			projectMapper.projectLikeDel(projectNo, userNo);
		};
		
		@PostMapping("/projectLikeView")
		public ProjectLikeVO projectLikeView(@RequestParam("projectNo") int projectNo, @RequestParam("userNo") int userNo) {
			return projectMapper.projectLikeView(projectNo, userNo);
		};
		
		
		
		// 프로젝트 삭제
		@PostMapping("/project/delete")
		public void deleteProjectComment(@RequestParam("projectNo") int projectNo) {
			
			projectMapper.projectLikeRemove(projectNo);
			projectMapper.projectCommentRemove(projectNo);
			projectMapper.projectDetailRemove(projectNo);		
			projectMapper.deleteProject(projectNo);		
		}
		
		//프로젝트 수정
		@PostMapping("/project/update")
		public void updateProject(@RequestBody ProjectVO project) {
			System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			System.out.println(project.getProjectNo());
			System.out.println(project.getTitle());
			System.out.println(project.getMeetingDate());
			System.out.println(project.getBuddies());
			projectMapper.updateProject(project);
		}	
	
	
	
}
