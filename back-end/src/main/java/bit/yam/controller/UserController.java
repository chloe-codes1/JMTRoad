package bit.yam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import bit.yam.model.Users;
import bit.yam.model.UsersDto;
import bit.yam.service.UsersService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/users")
public class UserController {

	@Autowired
	private UsersService usersService;
	
	@PostMapping
	public Users saveUser(@RequestBody UsersDto user) {
		System.out.println(user); //왜 null로 들어오지...
		return usersService.save(user);
	}
}
