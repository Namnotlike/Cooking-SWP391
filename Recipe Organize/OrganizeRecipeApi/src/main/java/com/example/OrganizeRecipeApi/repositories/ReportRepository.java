package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query(value = "SELECT r.* FROM report r ORDER BY r.create_at DESC OFFSET :offset ROWS FETCH NEXT :size ROWS ONLY",nativeQuery = true)
    List<Report> findAllPaging(int offset, int size);

    @Query(value = "SELECT COUNT(*) FROM report",nativeQuery = true)
    int countAllPaging();
}
