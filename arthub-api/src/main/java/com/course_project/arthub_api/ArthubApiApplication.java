package com.course_project.arthub_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class ArthubApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArthubApiApplication.class, args);
	}

}
