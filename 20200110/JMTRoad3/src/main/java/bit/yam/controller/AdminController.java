package bit.yam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.bean.AdminVO;
import bit.yam.service.AdminMapper;

@RestController
public class AdminController {
	
	@Autowired
	AdminMapper adminMapper;
	
	@PostMapping("/adminLogin")
	public int adminLogin(@RequestBody AdminVO admin) {		
		System.out.println(admin.getAdminID());
		System.out.println(admin.getPassword());
		return adminMapper.adminLogin(admin);
		
	}

}
