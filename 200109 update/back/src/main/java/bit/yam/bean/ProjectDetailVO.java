package bit.yam.bean;

import java.time.LocalTime;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("ProjectDetailVO")
public class ProjectDetailVO {

	private int projectNo;
	private int ownerNo;
	private int routeNo;
	private int estimate;
	private LocalTime time;
	private int payment;
	private String memo;
}
