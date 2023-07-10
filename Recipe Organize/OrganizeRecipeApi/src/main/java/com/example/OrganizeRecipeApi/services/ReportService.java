package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.constant.NotificationStatus;
import com.example.OrganizeRecipeApi.constant.NotificationType;
import com.example.OrganizeRecipeApi.constant.ROLE;
import com.example.OrganizeRecipeApi.entities.Account;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.entities.Notification;
import com.example.OrganizeRecipeApi.entities.Report;
import com.example.OrganizeRecipeApi.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private ReportRepository reportRepository;
    @Autowired
    private NotificationService notificationService;

    public Report insert(Report report){
        report.setId(0l);
        Report reportSaved = reportRepository.save(report);
        return reportSaved;
    }

    public List<Report> findAllPaging(int page, int size) {
        int offset = (page - 1) * size;
        List<Report> founded = reportRepository.findAllPaging(offset, size);
        return founded;
    }

    public int countAllPaging() {
        return reportRepository.countAllPaging();
    }
}
