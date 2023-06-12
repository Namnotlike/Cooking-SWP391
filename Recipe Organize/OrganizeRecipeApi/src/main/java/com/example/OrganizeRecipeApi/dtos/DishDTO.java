package com.example.OrganizeRecipeApi.dtos;

import com.example.OrganizeRecipeApi.entities.CategoryDetail;
import com.example.OrganizeRecipeApi.entities.Feedback;
import com.example.OrganizeRecipeApi.entities.Tag;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class DishDTO extends BaseDTO{
    private String dishName;
    private String description;
    private String process;
    private String ingredient;
    private Integer viewed;
    private String imageUrl;
    private Integer totalCalorie;
    private Double ratingPoint;
    private String cookerName;
    private String url;
    private Integer prepTime;
    private Integer cookTime;
    private Integer servings;
    private String note;
    private CategoryDetail categoryDetail;
    private Set<Tag> tags = new HashSet<>();
    private List<Feedback> feedbacks;

    @Override
    public String toString() {
        return "DishDTO{" +
                "id=" + getId() +
                ", name='" + dishName + '\'' +
                ", tags=" + tags.stream().map(Tag::getTagName).collect(Collectors.toList()) +
                // Các thuộc tính khác cần hiển thị
                '}';
    }
}
