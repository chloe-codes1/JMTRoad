package bit.yam.bean;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("OwnerVO")
public class OwnerVO {

	private int ownerNo;
	private int cuisine;
	private String ownerID;
	private String password;
	private String name;
	private String tel;
	private String address;
	private String storeName;
	private String BRNo;
	private String menuImg;
	private String openingHours;
	private String mainMenu;
	
}
