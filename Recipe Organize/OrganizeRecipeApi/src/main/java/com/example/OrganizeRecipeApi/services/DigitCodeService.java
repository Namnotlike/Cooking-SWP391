package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.DigitCode;
import com.example.OrganizeRecipeApi.repositories.DigitCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class DigitCodeService {
    @Autowired
    private DigitCodeRepository digitCodeRepository;

    public DigitCode generateAndSaveDigitCode(Long accountId) {
        String code = generateUniqueCode();
        LocalDateTime expiryDate = calculateExpiryDate();
        DigitCode digitCode = new DigitCode();
        digitCode.setCode(code);
        digitCode.setActive(true);
        digitCode.setAccountId(accountId);
        digitCode.setExpiryDate(expiryDate);
        return digitCodeRepository.save(digitCode);
    }

    private String generateUniqueCode() {
        String code = "";
        int randomNumber = new Random().nextInt(900000) + 100000;
        code = String.valueOf(randomNumber);
        return code;
    }

    private LocalDateTime calculateExpiryDate() {
        return LocalDateTime.now().plusMinutes(1);
    }

    public boolean authenticate(String code, Long accountId) {
        DigitCode digitCode = digitCodeRepository.findByCodeAndAccountId(code, accountId);
        if (digitCode != null && digitCode.getExpiryDate().isAfter(LocalDateTime.now())) {
            return true;
        }
        return false;
    }
}

