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
@Alias("StoreLikeVO")
public class StoreLikeVO {
	private int ownerNo;
	private int userNo;

}
