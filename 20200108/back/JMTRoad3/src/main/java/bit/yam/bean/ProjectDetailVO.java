package bit.yam.bean;

import java.time.LocalTime;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Setter
@Getter
@ToString
@Alias("ProjectDetailVO")
public class ProjectDetailVO {

	private int projectNo;
	private int ownerNo;
	private int routeNo;
	private int estimate;
	private LocalTime time;
	private int payment;
	private String memo;
	
	// 묘음추가
	private int userNo;
	private String storeName;
	private String menuImg;
}