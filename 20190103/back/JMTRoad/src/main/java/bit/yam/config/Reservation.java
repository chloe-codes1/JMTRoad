package bit.yam.config;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//import lombok.Builder.Default;

@Entity
@Table(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int reservationNO;
    @Column
    private int ownerNo;
    @Column
    private int userNo;
    @Column
    private int reservationList;
    @Column
    private String username;
    @Column
    private String phone;
    @Column 
    private Date regdate;
    @Column
    private String retime;
    @Column
    private int adult;
    @Column
    private int child;
    @Column
    private String request;
    @Column
    private String ok;
    
	public int getReservationNO() {
		return reservationNO;
	}
	public void setReservationNO(int reservationNO) {
		this.reservationNO = reservationNO;
	}
	public int getOwnerNo() {
		return ownerNo;
	}
	public void setOwnerNo(int ownerNo) {
		this.ownerNo = ownerNo;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public int getReservationList() {
		return reservationList;
	}
	public void setReservationList(int reservationList) {
		this.reservationList = reservationList;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	public String getRetime() {
		return retime;
	}
	public void setRetime(String retime) {
		this.retime = retime;
	}
	public int getAdult() {
		return adult;
	}
	public void setAdult(int adult) {
		this.adult = adult;
	}
	public int getChild() {
		return child;
	}
	public void setChild(int child) {
		this.child = child;
	}
	public String getRequest() {
		return request;
	}
	public void setRequest(String request) {
		this.request = request;
	}
	public String getOk() {
		return ok;
	}
	public void setOk(String ok) {
		this.ok = ok;
	}
	@Override
	public String toString() {
		return "Reservation [reservationNO=" + reservationNO + ", ownerNo=" + ownerNo + ", userNo=" + userNo
				+ ", reservationList=" + reservationList + ", username=" + username + ", phone=" + phone + ", regdate="
				+ regdate + ", retime=" + retime + ", adult=" + adult + ", child=" + child + ", request=" + request
				+ ", ok=" + ok + "]";
	}
    
	
    
}