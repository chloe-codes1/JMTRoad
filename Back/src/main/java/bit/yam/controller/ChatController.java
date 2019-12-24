package bit.yam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import bit.yam.bean.ChatVO;

@Controller
public class ChatController {


	/*-------------------- Group (Public) chat--------------------*/
	@MessageMapping("/sendMessage")
	@SendTo("/topic/pubic")
	public ChatVO sendMessage(@Payload ChatVO chatMessage) {
		return chatMessage;
	}

	@MessageMapping("/addUser")
	@SendTo("/topic/pubic")
	public ChatVO addUser(@Payload ChatVO chatMessage,
			SimpMessageHeaderAccessor headerAccessor) {
		// Add user in web socket session
		headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
		return chatMessage;
	}


	/*--------------------Private chat--------------------*/
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/sendPrivateMessage")
	//@SendTo("/queue/reply")
	public void sendPrivateMessage(@Payload ChatVO chatMessage) {
		simpMessagingTemplate.convertAndSendToUser(
				chatMessage.getReceiver().trim(), "/reply", chatMessage); 
		//return chatMessage;
	}

	@MessageMapping("/addPrivateUser")
	@SendTo("/queue/reply")
	public ChatVO addPrivateUser(@Payload ChatVO chatMessage,
			SimpMessageHeaderAccessor headerAccessor) {
		// Add user in web socket session
		headerAccessor.getSessionAttributes().put("private-username", chatMessage.getSender());
		return chatMessage;
	}
}
