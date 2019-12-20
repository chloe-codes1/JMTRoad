package bit.yam.config;

import javax.persistence.*;

@Entity
@Table(name = "ownerstore")
public class OwnerStore {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int ownerNo;
    @Column
    private String ownerID;
    @Column
    private String password ;
    @Column
    private String name;
    @Column
    private String tel;
    @Column
    private String loc;
    @Column 
    private String stName;
    @Column
    private String BRNo;
    @Column
    private String foodstyle;
    @Column
    private String mainMenu;
    @Column
    private String menuImg;
    @Column
    private String octime;
	public int getOwnerNo() {
		return ownerNo;
	}
	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}
	public String getOwnerID() {
		return ownerID;
	}
	public void setOwnerID(String ownerID) {
		this.ownerID = ownerID;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getLoc() {
		return loc;
	}
	public void setLoc(String loc) {
		this.loc = loc;
	}
	public String getStName() {
		return stName;
	}
	public void setStName(String stName) {
		this.stName = stName;
	}
	public String getBRNo() {
		return BRNo;
	}
	public void setBRNo(String bRNo) {
		BRNo = bRNo;
	}
	public String getFoodstyle() {
		return foodstyle;
	}
	public void setFoodstyle(String foodstyle) {
		this.foodstyle = foodstyle;
	}
	public String getMainMenu() {
		return mainMenu;
	}
	public void setMainMenu(String mainMenu) {
		this.mainMenu = mainMenu;
	}
	public String getMenuImg() {
		return menuImg;
	}
	public void setMenuImg(String menuImg) {
		this.menuImg = menuImg;
	}
	public String getOctime() {
		return octime;
	}
	public void setOctime(String octime) {
		this.octime = octime;
	}
    
    
}
	