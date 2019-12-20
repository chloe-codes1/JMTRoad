package bit.yam.bean;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserVO {
	
	private int userNo;
	private int level;
	private int gender;
	private int userStatus;
	private int violation;
	private int reasonCode;
	private String userID;
	private String nickname;
	private LocalDate birthday;
	private int age;
	private String phone;
	private String profileImg;
	private int shareLocation;
	private LocalDate regDate;
	private int wtCount;
}