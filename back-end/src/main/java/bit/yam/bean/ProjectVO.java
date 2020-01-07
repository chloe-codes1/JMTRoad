package bit.yam.bean;

import java.time.LocalDate;

import org.apache.ibatis.type.Alias;

import lombok.Data;
@Data
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
	
}
