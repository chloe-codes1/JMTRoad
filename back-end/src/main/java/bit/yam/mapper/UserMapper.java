package bit.yam.mapper;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.UserVO;

@Mapper
public interface UserMapper {

	void userInsert(UserVO user);
	UserVO lookupUserByID(String userID);
	UserVO lookupUserByNickname(String nickname);
}
