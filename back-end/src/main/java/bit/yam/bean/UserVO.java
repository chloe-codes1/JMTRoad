package bit.yam.bean;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.Data;


@Data
@Entity
@Table(name = "Users")
public class UserVO {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer userNo;
    @Column
    private String userID; // google
    @Column
    private String nickname;
    @Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDate birthday;
    @Column
    private Long age;
    @Column
    private String Phone;
    @Column
    private String profileImg;
    @Column
    private boolean shareLocation;
    @Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDate regDate;
    @Column
    private Integer wtCount;
    @Column
    private Integer level;
    @Column(columnDefinition = "TINYINT(4) default 41")
    private Integer gender;
    @Column(columnDefinition = "TINYINT(4) default 11")
    private Integer userStatus;
    @Column(columnDefinition = "TINYINT(4) default 21")
    private Integer violation;
    @Column(columnDefinition = "TINYINT(4) default 71")
    private Integer reasonCode;

    
    @PrePersist
    public void prePersist() {
    	System.out.println("*** prePersist() called!! ***");
    	if (this.level == 0) level = 1;
    	if (this.reasonCode == 0) reasonCode = 71;
    	if (this.userStatus == 0) userStatus = 11;
    	if (this.violation == 0) violation = 21;
    	if (this.age == 0) age = getAgeFromBirthday(birthday);
    	if (this.age.equals(null)) age = getAgeFromBirthday(birthday);
    	shareLocation = false;
    	
//    	if (StringUtils.isEmpty(profileImg) && gender == 41) profileImg = "./img/woman" ;
//    	if (StringUtils.isEmpty(profileImg) && gender == 42) profileImg = "./img/man" ;
    }
  
    // 생일 기준으로 나이 구하기
    public static Long getAgeFromBirthday(LocalDate birthday) {
    	LocalDate birthdate = birthday;
    	LocalDate now = LocalDate.now();
    	Long years = ChronoUnit.YEARS.between(birthdate, now);
    	return years;
    }
}
