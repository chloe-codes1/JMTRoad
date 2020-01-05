package bit.yam.bean;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Data;

@Data
@JsonAutoDetect
public class ExProjectVO {

	private int userNo;
	private String title;
	private LocalDate date;
	private int totalExpense;
	private List<ExProjectDetailVO> exProjectDetail;
	
	@Data
	@JsonAutoDetect
	public class ExProjectDetailVO{
		private int routeNo;
		private int ownerNo;
	};
	
}
