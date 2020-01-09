package bit.yam.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bit.yam.bean.Waiting;
import bit.yam.bean.WaitingDao;


/*@Transactional*/
@Service(value = "WaitingService")
public class WaitingServiceImpl implements WaitingService {
	
	@Autowired
	private WaitingDao waitingdao;

	@Override
	public List<Waiting> findAll() {
		  List<Waiting> list = new ArrayList<>();
		  waitingdao.findAll().iterator().forEachRemaining(list::add);
		  return list;
	}

	@Override
	public Waiting findByOne(String uName) {
		return null;
	}

	@Override
	public Waiting findById(int waitNO) {
		Optional<Waiting> optionalUser = waitingdao.findById(waitNO);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

	@Override
	public void delete(int waitNO) {
	 waitingdao.deleteById(waitNO);
	}

	@Override
	public Waiting save(Waiting user) {
		Waiting newWaiting = new Waiting();
		newWaiting.setUsername(user.getUsername());
		newWaiting.setPhone(user.getPhone());
		newWaiting.setAdult(user.getAdult());
		newWaiting.setChild(user.getChild());
		newWaiting.setRequest(user.getRequest());
		return waitingdao.save(newWaiting);
	}
}
