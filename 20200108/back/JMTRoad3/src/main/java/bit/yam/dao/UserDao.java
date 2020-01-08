package bit.yam.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bit.yam.bean.UserVO;

@Repository
public interface UserDao extends CrudRepository<UserVO, Integer> {

    UserVO findByNickname(String nickname);
}
