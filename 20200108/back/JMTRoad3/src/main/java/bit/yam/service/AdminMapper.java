package bit.yam.service;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.type.Alias;

import bit.yam.bean.AdminVO;

@Mapper
@Alias("AdminMapper")
public interface AdminMapper {
	
	public int adminLogin(AdminVO admin);
	

}
