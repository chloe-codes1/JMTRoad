package bit.yam.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bit.yam.bean.UserVO;
import bit.yam.dao.UserDao;
import bit.yam.model.UserDto;

@Transactional
@Service(value = "userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao userDao;

	@Autowired
	private UserMapper userMapper;
	
	public List<UserVO> findAll() {
		List<UserVO> list = new ArrayList<>();
		userDao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(int id) {
		userDao.deleteById(id);
	}

	@Override
	public UserVO findOne(String nickname) {
		return userDao.findByNickname(nickname);
	}

	@Override
	public UserVO findById(int id) {
		Optional<UserVO> optionalUser = userDao.findById(id);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

    @Override
    public UserDto update(UserDto userDto) {
        UserVO user = findById(userDto.getUserNo());
        if(user != null) {
            BeanUtils.copyProperties(userDto, user, "userNo", "nickname");
            userDao.save(user);
        }
        return userDto;
    }

    @Override
    public UserVO save(UserDto user) {
	    UserVO newUser = new UserVO();
        newUser.setUserID(user.getUserID());
	    newUser.setNickname(user.getNickname());
	    newUser.setBirthday(user.getBirthday());
	    newUser.setAge(user.getAge());
	    newUser.setPhone(user.getPhone());
		newUser.setShareLocation(user.isShareLocation());
		newUser.setGender(user.getGender());
        return userDao.save(newUser);
    }

	@Override
	public void uploadProfileImage(int userNo, String fileUrl) {
		userMapper.uploadProfileImage(userNo, fileUrl);
	}
}
