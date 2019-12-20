package bit.yam.service;


import java.text.SimpleDateFormat;
import java.util.Date;

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
	public Users save(UsersDto user) {
		Users newUser = new Users();
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String currentTime = sdf.format(date);
		
		newUser.setUserID(user.getUserID());
		newUser.setLevel(1);
		newUser.setGender(41);
		newUser.setUserStatus(11);
		newUser.setViolation(21);
		newUser.setReasonCode(71);
		newUser.setRegDate(currentTime);
		newUser.setWtCount(0);
		return usersDao.save(newUser);
	}

}
