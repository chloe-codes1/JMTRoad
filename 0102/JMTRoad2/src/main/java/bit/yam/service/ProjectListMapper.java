package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.ProjectVO;

@Mapper
public interface ProjectListMapper {

	List<ProjectVO> getMyProjectList(int userNo);
	List<ProjectVO> getSavedProjectList(int userNo);
	List<ProjectVO> getLikedProjectList(int userNo);

}
