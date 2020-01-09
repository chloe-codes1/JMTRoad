package bit.yam.bean;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Setter
@Getter
@ToString
@Alias("AdminVO")
public class AdminVO {
	
	private int adminNo;
	private String adminID;
	private String password;
	

}
