package com.example.OrganizeRecipeApi.repositories;

import com.example.OrganizeRecipeApi.entities.Notification;
import com.example.OrganizeRecipeApi.entities.ViewStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ViewStatisticRepository extends JpaRepository<ViewStatistic, Long> {
    @Query(value = "SELECT v.* from view_statistic v WHERE v.year = :year AND v.month = :month AND v.day = :day",nativeQuery = true)
    ViewStatistic findByYearMonthDay(int year, int month, int day);

    @Query(value = "select SUM(viewed) from view_statistic where year = 2023 and month = :month",nativeQuery = true)
    Integer sumByMonth(int month);

    @Query(value = "select SUM(viewed) from view_statistic where year = 2023 and month = :month and day = :day",nativeQuery = true)
    Integer sumByDay(int month, int day);
}
