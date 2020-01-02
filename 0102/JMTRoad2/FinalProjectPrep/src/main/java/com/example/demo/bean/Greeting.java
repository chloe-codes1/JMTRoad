package com.example.demo.bean;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("Greeting")
@Data
public class Greeting {

	private String content;
	
	public Greeting() {}
	
	public Greeting(String content) {
		this.content = content;
	}
	
}
