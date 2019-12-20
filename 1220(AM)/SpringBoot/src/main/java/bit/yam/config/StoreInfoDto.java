package bit.yam.config;

public class StoreInfoDto {

    private int ownerNo;
    private String cusine;
    private String address;
    private String storeName;
    private long BRNo;
    private int tel;
    private long openingHours;
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