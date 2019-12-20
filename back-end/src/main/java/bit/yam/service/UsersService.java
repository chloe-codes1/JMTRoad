package bit.yam.service;

import bit.yam.model.Users;
import bit.yam.model.UsersDto;

public interface UsersService {

	Users save(UsersDto user);
}