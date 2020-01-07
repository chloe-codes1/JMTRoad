package bit.yam.bean;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import lombok.Data;

@Data
@JsonAutoDetect
public class ExProjectDetailVO {

	private int routeNo;
	private int ownerNo;
	
}
