package bit.yam.bean;

import java.sql.Date;

import lombok.Data;

@Data
public class StoreReviewVO {

	private int storeReviewNo;
	private String nickname;
	private int userNo;
	private int ownerNo;
	private Date reviewDate;
	private int star;
	private String contents;
}
