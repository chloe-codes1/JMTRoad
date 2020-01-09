package bit.yam.bean;

import java.util.List;

import lombok.Data;

@Data
public class EateryInfoVO {

	private String storeName;
	private String tel;
	private String address;
	private String mainMenu;
	
	private List<StoreReviewVO> SRList;
}
