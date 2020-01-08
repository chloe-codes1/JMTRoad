package bit.yam.bean;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "storereview")
public class StoreReview {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int storereviewNo;
    @Column
    private String nickname;
    @Column
    private int userNo;
    @Column
    private int ownerNo;
    @Column
    private Date reviewDate;
    @Column
    private int star;
    @Column
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
	public Date getReviewDate() {
		return reviewDate;
	}
	public void setReviewDate(Date reviewDate) {
		this.reviewDate = reviewDate;
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