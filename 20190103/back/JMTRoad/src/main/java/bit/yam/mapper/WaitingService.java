package bit.yam.mapper;

import java.util.List;

import bit.yam.config.Waiting;

public interface WaitingService {

	List<Waiting> findAll();

	Waiting findByOne(String uName);

	Waiting findById(int waitNO);

	void delete(int waitNO);

	Waiting save(Waiting user);

}
