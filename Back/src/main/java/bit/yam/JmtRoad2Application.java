package bit.yam;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import bit.yam.bean.UserVO;
import bit.yam.dao.UserDao;

@SpringBootApplication
public class JmtRoad2Application {

	public static void main(String[] args) {
		SpringApplication.run(JmtRoad2Application.class, args);
	}

	@Bean
	public CommandLineRunner init(UserDao userDao) {
		return args -> {
			UserVO user1 = new UserVO();
			user1.setUserID("chloe@gmail.com");
			user1.setNickname("Chloe");
			user1.setBirthday(LocalDate.of(1995, 8, 25));
			user1.setPhone("010-0000-0000");
			user1.setShareLocation(false);
			user1.setUserStatus(11);
			user1.setViolation(22); // 옐로카드 출력 보려구!
			user1.setGender(41);
			user1.setLevel(1);
			user1.setReasonCode(71);
			userDao.save(user1);

			UserVO user2 = new UserVO();
           user2.setUserID("camila@gmail.com");
           user2.setNickname("Camila");
           user2.setBirthday(LocalDate.of(1995, 8, 25));
           user2.setPhone("010-0000-0000");
           user2.setShareLocation(false);
           user2.setUserStatus(11);
           user2.setViolation(21);
           user2.setGender(41);
           user2.setLevel(1);
           user2.setReasonCode(71);
           userDao.save(user2);
			
		};
	}
}