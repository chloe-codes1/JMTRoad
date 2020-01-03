package bit.yam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.config.Waiting;
import bit.yam.mapper.WaitingMapper;
import bit.yam.mapper.WaitingService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/waiting")
public class WaitingController {

	@Autowired
	private WaitingService userService;

	@Autowired
	private WaitingMapper waitmapper;

	@PostMapping
	public void saveUser(@RequestBody Waiting user) {

		waitmapper.savewait(user);
	}

	@GetMapping
	public List<Waiting> listUser() {
		return userService.findAll();
	}
	
	@GetMapping("/list/{ownerNo}")
	public List<Waiting> listwaiting(@PathVariable int ownerNo) {
		return waitmapper.waitingList(ownerNo);
	}
	

	@GetMapping("/{ownerNo}")
	public int countwaiting(@PathVariable int ownerNo) {
		return waitmapper.countwaiting(ownerNo);
	}

}
