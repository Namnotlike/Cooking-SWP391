package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Feedback;
import com.example.OrganizeRecipeApi.repositories.CookerRepository;
import com.example.OrganizeRecipeApi.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback insert(Feedback feedback){
        feedback.setId(0l);
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> findAll(){
        return feedbackRepository.findAll();
    }

    public List<Feedback> findByDishId(Long id){
        return feedbackRepository.findByDishId(id);
    }

    public Feedback save(Feedback item) {
        return feedbackRepository.save(item);
    }
}
