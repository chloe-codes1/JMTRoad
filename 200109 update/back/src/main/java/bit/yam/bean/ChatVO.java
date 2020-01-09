package bit.yam.bean;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ChatVO {
    private MessageType type;
    private String content;
    private String sender;
    private String receiver;
	private LocalDateTime dateTime=LocalDateTime.now();; 
    
    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        TYPING
    }
}
