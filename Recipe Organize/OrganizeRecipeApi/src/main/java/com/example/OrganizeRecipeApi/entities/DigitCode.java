package com.example.OrganizeRecipeApi.entities;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class DigitCode extends BaseEntity{

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false)
    private Long accountId;
}
