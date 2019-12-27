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
    private String storeName;
    @Column
    private String brNo;
    @Column
    private String cuisine;
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
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	public String getBrNo() {
		return brNo;
	}
	public void setBrNo(String brNo) {
		this.brNo = brNo;
	}
	public String getCuisine() {
		return cuisine;
	}
	public void setCuisine(String cuisine) {
		this.cuisine = cuisine;
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
	