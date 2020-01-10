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
@Alias("ProjectCommentVO")
public class ProjectCommentVO {
	
	private int projectCommentNo;
	private int projectNo;
	private int userNo;
	private String content;
	private LocalDate regDate;
	private int open;
	private String nickname;

}
