package bit.yam.mapper;

import java.util.List;

import bit.yam.config.Reserve;

public interface UserService {

	Reserve save(Reserve user);
	List<Reserve> findAll();
	void delete(int waitNO);

	Reserve findByOne(String uName);
	
	Reserve findById(int waitNO);

}
