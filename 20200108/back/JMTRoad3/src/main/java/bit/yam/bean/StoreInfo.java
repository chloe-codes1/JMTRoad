package bit.yam.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "storeinfo")
public class StoreInfo {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int ownerNo;
    @Column
    private String storeName;
    @Column
    private long BRNo;
    @Column
    private int tel;
    @Column
    private String address;
    @Column
    private long openingHours;
    @Column
    private String cusine;
    @Column
    private String menuImg;
    
	public int getOwnerNo() {
		return ownerNo;
	}
	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}
	public String getCusine() {
		return cusine;
	}
	public void setCusine(String cusine) {
		this.cusine = cusine;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	public long getBRNo() {
		return BRNo;
	}
	public void setBRNo(long bRNo) {
		BRNo = bRNo;
	}
	public int getTel() {
		return tel;
	}
	public void setTel(int tel) {
		this.tel = tel;
	}
	public long getOpeningHours() {
		return openingHours;
	}
	public void setOpeningHours(long openingHours) {
		this.openingHours = openingHours;
	}
	public String getMenuImg() {
		return menuImg;
	}
	public void setMenuImg(String menuImg) {
		this.menuImg = menuImg;
	}
    
}