package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;

import bit.yam.bean.ProjectCommentVO;

@Mapper
@Alias("ProjectCommentMapper")
public interface ProjectCommentMapper {
	public List<ProjectCommentVO> projectCommentList(int projectNo);
	public void insertProjectComment(ProjectCommentVO projectComment);
	public void updateProjectComment(int projectCommentNo, String content);
	public void deleteProjectComment(int projectCommentNo);
	

}
