package com.example.demo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.example.demo.bean.Chat;
import com.example.demo.bean.Greeting;

@Controller
public class ChatController {

//	@MessageMapping("/hello")
//	@SendTo("/topic/greetings")
//	public Greeting greeting(HelloMessage msg) throws Exception{
//		Thread.sleep(1000);
//		return new Greeting("Hello, " + HtmlUtils.htmlEscape(msg.getName()) + "!");
//	}
	
	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting Hello(Chat chat) throws Exception{
		Thread.sleep(1000);
		return new Greeting("[ " + HtmlUtils.htmlEscape(chat.getName()) + " logged in ]");
	}
	
	@MessageMapping("/chat")
	@SendTo("/topic/chat")
	public Chat chat(Chat chat) throws Exception{
		return new Chat(chat.getName(), chat.getMessage());
	}
	
	
}
