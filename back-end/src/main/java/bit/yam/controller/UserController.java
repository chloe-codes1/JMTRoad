package bit.yam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.model.Users;
import bit.yam.model.UsersDto;
import bit.yam.service.UsersService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UsersService usersService;
	
	@PostMapping
	public ResponseEntity<Users> saveUser(@RequestBody UsersDto user) {
		System.out.println("1st "+user); //왜 null로 들어오지...
		
		Users newUser = usersService.save(user);
		if(newUser == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(newUser, HttpStatus.OK);
	}
}
