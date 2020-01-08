package bit.yam.service;

import java.util.List;

import bit.yam.bean.Waiting;

public interface WaitingService {

	List<Waiting> findAll();

	Waiting findByOne(String uName);

	Waiting findById(int waitNO);

	void delete(int waitNO);

	Waiting save(Waiting user);

}
