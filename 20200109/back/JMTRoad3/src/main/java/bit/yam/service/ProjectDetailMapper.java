package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;

import bit.yam.bean.ProjectDetailVO;

@Mapper
@Alias("ProjectDetailMapper")
public interface ProjectDetailMapper {	
	public List<ProjectDetailVO> listProjectDetail(int projectNo);
	public void updateProjectDetail(ProjectDetailVO projectDetail);
	public void deleteProjectDetail(int projectNo, int ownerNo);

}
