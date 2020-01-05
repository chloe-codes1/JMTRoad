package bit.yam.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.ExProjectVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ProjectController {

	@PostMapping("/project")
	public void saveProject(@RequestBody ExProjectVO exProject) {
		
		System.out.println(exProject);
	}
}
