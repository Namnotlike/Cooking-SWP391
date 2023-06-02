package com.example.OrganizeRecipeApi.controllers;

import com.example.OrganizeRecipeApi.entities.Feedback;
import com.example.OrganizeRecipeApi.payload.ResponseHandle;
import com.example.OrganizeRecipeApi.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseHandle<Feedback> createFeedback(@RequestParam String content){
        Feedback feedback = new Feedback();
        feedback.setFeedBackContent(content.trim());
        return new ResponseHandle<Feedback>(feedbackService.insert(feedback));
    }
}
