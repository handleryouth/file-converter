package com.example.converterjob;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ConverterJobApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConverterJobApplication.class, args);
	}

}
