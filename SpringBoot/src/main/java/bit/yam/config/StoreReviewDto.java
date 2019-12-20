package bit.yam.config;

import java.sql.Date;

public class StoreReviewDto {

	private int storereviewNo;
    private String nickname;
	private int userNo;
	private int ownerNo;
    private Date date;
	private int star;
	private String contents;
	
	public int getStorereviewNo() {
		return storereviewNo;
	}
	public void setStorereviewNo(int storereviewNo) {
		this.storereviewNo = storereviewNo;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public int getOwnerNo() {
		return ownerNo;
	}
	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	
}