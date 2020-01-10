package bit.yam.bean;

import java.time.LocalDate;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Data
@Setter
@Getter
@ToString
@Alias("ProjectVO")
public class ProjectVO {

	private int projectNo;
	private int userNo;
	private int projectStatus;
	private int reasonCode;
	private String title;
	private LocalDate regDate;
	private LocalDate meetingDate;
	private long totalExpense;
	private int read;
	private boolean open;
	private boolean shared;
	private String baseNo;
	private int buddies;
	
	//묘음추가
	private String nickname;
	private String menuImg;
	
}
