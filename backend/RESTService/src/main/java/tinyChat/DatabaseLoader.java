package tinyChat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final MessageRepository repository;

	@Autowired
	public DatabaseLoader(MessageRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		this.repository.save(new Message("Jane", "Hello!", 1421953410956l));
    this.repository.save(new Message("Sam", "How are you?", 1421953434028l));
    this.repository.save(new Message("Jane", "I'm in SAT!", 1421953433276l));
    this.repository.save(new Message("Jane", "Flight is delayed. :P San Antonio TSA was the friendliest I've ever encountered, though. And I have a hamburger, a beer, and decent wifi.", 1421953454129l));
    this.repository.save(new Message("Sam", "Not bad.", 1421953475813l));
    this.repository.save(new Message("alex", "do you still need a ride from the airport?", 1421953485810l));
    this.repository.save(new Message("Jane", "@Alex: Yeah, likely will get my bags after BART stops running. They're saying the ETA is 11:40pm now. Is that too late for you?", 1421953502796l));
    this.repository.save(new Message("alex", "that's fine", 1421953569386l));
	}
}