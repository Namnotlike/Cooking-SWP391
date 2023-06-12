package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.DigitCode;
import com.example.OrganizeRecipeApi.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;


public interface DigitCodeRepository extends JpaRepository<DigitCode, Long> {
    DigitCode findByCodeAndAccountId(String code, Long accountId);

    List<DigitCode> findByActiveTrueAndExpiryDateBefore(LocalDateTime expiryDateTime);
}
