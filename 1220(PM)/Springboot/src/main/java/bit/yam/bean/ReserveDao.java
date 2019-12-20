package bit.yam.bean;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bit.yam.config.Reserve;

@Repository
public interface ReserveDao extends CrudRepository<Reserve, Integer> {

    Reserve findByUsername(String uName);
   
}
