package bit.yam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bit.yam.service.EmailServiceImpl;

@RestController
public class ManagementUserController {
	
	@Autowired
	JavaMailSender javaMailSender;
	
	
	@PostMapping("sendMail")
	public void sendFormMail(@RequestParam("title") String title, @RequestParam("content") String content) {
		String adminEmail = "juhyun.kim@lindsey.edu";
		EmailServiceImpl emailService = new EmailServiceImpl();
		emailService.setJavaMailSender(javaMailSender);
		emailService.sendMail(adminEmail, title, content);
	}
	
	
}
