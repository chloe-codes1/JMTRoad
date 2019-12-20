package com.devglan.model;


import java.sql.Date;
import java.sql.Time;

import javax.persistence.*;

@Entity
@Table(name = "reserve")
public class Reserve {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int waitNO;
    @Column
    private int ownerNo;
    @Column
    private int userNo;
    @Column
    private int waitingList;
    @Column
    private String username;
    @Column
    private String phone;
    @Column 
    private Date redate;
    @Column
    private String retime;
    @Column
    private int adult;
    @Column
    private int child;
    @Column
    private String request;
    
	public int getWaitNO() {
		return waitNO;
	}
	public void setWaitNO(int waitNO) {
		this.waitNO = waitNO;
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
	public int getWaitingList() {
		return waitingList;
	}
	public void setWaitingList(int waitingList) {
		this.waitingList = waitingList;
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
	public Date getRedate() {
		return redate;
	}
	public void setRedate(Date redate) {
		this.redate = redate;
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
    
	
	

}