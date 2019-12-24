package bit.yam.service;

import java.util.List;

import bit.yam.bean.UserVO;
import bit.yam.model.UserDto;

public interface UserService {

    UserVO save(UserDto user);
    List<UserVO> findAll();
    void delete(int id);

    UserVO findOne(String username);

    UserVO findById(int id);

    UserDto update(UserDto userDto);
    
    void uploadProfileImage(int userNo, String fileUrl);
}
