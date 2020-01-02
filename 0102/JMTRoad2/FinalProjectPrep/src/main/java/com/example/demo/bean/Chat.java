package com.example.demo.bean;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("Chat")
@Data
public class Chat {

	private String name;
	private String message;
	
	public Chat() {}
	
	public Chat(String name){
		this.name = name;
	}
	
	public Chat(String name, String message) {
		
		this.name = name;
		this.message = message;
	}
}
