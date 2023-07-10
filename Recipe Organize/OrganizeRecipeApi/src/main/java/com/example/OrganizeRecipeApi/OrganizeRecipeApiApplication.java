package com.example.OrganizeRecipeApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class OrganizeRecipeApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(OrganizeRecipeApiApplication.class, args);
	}
}
