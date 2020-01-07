package bit.yam.service;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.ProjectDetailVO;
import bit.yam.bean.ProjectVO;

@Mapper
public interface ProjectMapper {

	void projectInsert(ProjectVO project);
	void projectDetailInsert(ProjectDetailVO pjDetail);
}
