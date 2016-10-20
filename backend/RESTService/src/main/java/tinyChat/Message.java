package tinyChat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Message {
	private @Id @GeneratedValue Long id;
	private String author;
	@Column(columnDefinition = "TEXT")
	private String content;
	private Long timestamp;

	private Message() {}

	public Message(String author, String content, Long timestamp) {
		this.author = author;
		this.content = content;
		this.timestamp = timestamp;
	}
}