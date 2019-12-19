package bit.yam.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bit.yam.model.Users;

@Repository //얘 뭐야..
public interface UsersDao extends CrudRepository<Users, Integer>{

	Users findByUserID(String userID);
}