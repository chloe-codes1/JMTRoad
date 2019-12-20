package com.devglan.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devglan.dao.ReserveDao;
import com.devglan.model.Reserve;
import com.devglan.service.UserService;

/*@Transactional*/
@Service(value = "userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private ReserveDao reservedao;

	public List<Reserve> findAll() {
		List<Reserve> list = new ArrayList<>();
		reservedao.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(int waitNO) {
		reservedao.deleteById(waitNO);
	}

//    @Override
//    public Reserve save(UserDto reserve) {
//	    Reserve newReserve = new Reserve();
//	    newReserve.setUsername(reserve.getUsername());
//	    newReserve.setPhone(reserve.getPhone());
//	    newReserve.setRedate(reserve.getRedate());
//	    newReserve.setAdult(reserve.getAdult());
//	    newReserve.setChild(reserve.getChild());
//	    newReserve.setRequest(reserve.getRequest());
//	
//        return reservedao.save(newReserve);
//    }

	@Override
	public Reserve findById(int WaitNo) {
		Optional<Reserve> optionalUser = reservedao.findById(WaitNo);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}


	@Override
	public Reserve findByOne(String uName) {
		return null;
	}


	@Override
	public Reserve save(Reserve user) {
		Reserve newReserve = new Reserve();
	    newReserve.setUsername(user.getUsername());
	    newReserve.setPhone(user.getPhone());
	    newReserve.setRedate(user.getRedate());
	    newReserve.setRetime(user.getRetime());
	    newReserve.setAdult(user.getAdult());
	    newReserve.setChild(user.getChild());
	    newReserve.setRequest(user.getRequest());
	
        return reservedao.save(newReserve);
	}

}
