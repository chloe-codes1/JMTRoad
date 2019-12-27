package bit.yam.bean;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bit.yam.config.Waiting;

@Repository
public interface WaitingDao extends CrudRepository<Waiting, Integer> {

	Waiting findByUsername(String uName);
   
}
