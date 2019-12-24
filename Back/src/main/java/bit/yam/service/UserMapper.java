package bit.yam.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import bit.yam.bean.OwnerVO;
import bit.yam.bean.UserVO;

@Mapper
public interface UserMapper {
	
	void withdrawUser(int userNo);
	void uploadProfileImage(int userNo, String fileUrl);
	List<OwnerVO> getLikedStoreList (int userNo);
	List<UserVO> followingList (int userNo);
	List<UserVO> followerList (int userNo);
	void follow(int userNo, int targetNo);
	void unFollow(int userNo, int targetNo);
	
	// 은석오빠
	void userInsert(UserVO user);
	UserVO lookupUserByID(String userID);
	UserVO lookupUserByNickname(String nickname);
}
