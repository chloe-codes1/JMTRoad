package bit.yam.bean;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@JsonAutoDetect
public class ExProjectVO {

	private int userNo;
	private String title;
	@JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
	private LocalDate meetingDate;
	private int totalExpense;
	private List<ExProjectDetailVO> ProjectDetail;
	
}
