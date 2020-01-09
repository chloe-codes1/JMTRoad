package bit.yam.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserDto {

	private Integer userNo;
	private String userID;
	private String nickname;
	private LocalDate birthday;
	private Long age;
	private String Phone;
	private String profileImg;
	private boolean shareLocation;
	private LocalDate regDate;
	private int wtCount;
	private int level;
	private int gender;
	private int userStatus;
	private int violation;
	private int reasonCode;
}
