package bit.yam.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bit.yam.dao.UsersDao;
import bit.yam.model.Users;
import bit.yam.model.UsersDto;

@Transactional
@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	private UsersDao usersDao;
	
	@Override
	public Users save(UsersDto users) {
		Users newUser = new Users();
		newUser.setUserID(users.getUserID());
		newUser.setLevel(1);
		newUser.setGender(41);
		newUser.setUserStatus(11);
		newUser.setViolation(21);
		newUser.setReasonCode(71);
		newUser.setWtCount(0);
		return usersDao.save(newUser);
	}

}
