package com.example.OrganizeRecipeApi.utils;

import com.example.OrganizeRecipeApi.entities.DigitCode;
import com.example.OrganizeRecipeApi.repositories.DigitCodeRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ExpiredDigitCodeCleanup {
    private final DigitCodeRepository digitCodeRepository;

    public ExpiredDigitCodeCleanup(DigitCodeRepository digitCodeRepository) {
        this.digitCodeRepository = digitCodeRepository;
    }

    @Scheduled(fixedRate = 60000) // Lên lịch chạy mỗi phút (60.000 milliseconds)
    public void deleteExpiredDigitCodes() {
        List<DigitCode> expiredCodes = digitCodeRepository.findByActiveTrueAndExpiryDateBefore(LocalDateTime.now().minusMinutes(1));
        digitCodeRepository.deleteAll(expiredCodes);
    }
}
