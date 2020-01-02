package com.example.demo.bean;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("HelloMessage")
@Data
public class HelloMessage {

	private String name;
	
	public HelloMessage() {}
	
	public HelloMessage(String name) {
		this.name = name;
	}
	
}
