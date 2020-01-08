package bit.yam.service;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.ProjectDetailVO;
import bit.yam.bean.ProjectLikeVO;
import bit.yam.bean.ProjectVO;

@Mapper
public interface ProjectMapper {

	void projectInsert(ProjectVO project);
	void projectDetailInsert(ProjectDetailVO pjDetail);
	
//	묘음추가
	void updateRead(int projectNo);
	ProjectVO selectProject(int projectNo);
	void updateProject(ProjectVO project);
	void deleteProject(int projectNo);
	
	void projectLike(int projectNo, int userNo);
	void projectLikeDel(int projectNo, int userNo);
	ProjectLikeVO projectLikeView(int projectNo, int userNo);
	
	public void projectLikeRemove(int projectNo);
	public void projectCommentRemove(int projectNo);
	public void projectDetailRemove(int projectNo);
	
}
