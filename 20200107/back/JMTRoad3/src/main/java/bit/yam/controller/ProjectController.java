package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.ExProjectDetailVO;
import bit.yam.bean.ExProjectVO;
import bit.yam.bean.ProjectDetailVO;
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
}
