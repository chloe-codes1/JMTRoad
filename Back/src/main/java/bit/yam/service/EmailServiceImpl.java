package bit.yam.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailServiceImpl {

	JavaMailSender emailSender;
	
	public void setJavaMailSender (JavaMailSender javaMailSender) {
		this.emailSender = javaMailSender;
	}
	
	public void sendMail (String sendTo, String title, String content) {
		SimpleMailMessage message = new SimpleMailMessage();
		//보낼 대상 설정
		message.setTo(sendTo);
		//메일 제목
		message.setSubject(title);
		//메일 내용
		message.setText(content);
		
		//보내기 !!
		emailSender.send(message);
	}
}
