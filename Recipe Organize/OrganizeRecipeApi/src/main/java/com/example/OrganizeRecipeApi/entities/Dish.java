package com.example.OrganizeRecipeApi.entities;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Dish extends BaseEntity{
    @Column(columnDefinition = "nvarchar(255)")
    private String dishName;

    @Column(columnDefinition = "nvarchar(max)")
    private String description;
    @Column(columnDefinition = "nvarchar(max)")
    private String process;
    @Column(columnDefinition = "nvarchar(max)")
    private String ingredient;
    private Integer viewed = 0;
    private String imageUrl;
    private Integer totalCalorie;
    private Double ratingPoint = 5.0;
    private Integer prepTime = 0;
    private Integer cookTime = 0;
    private Integer servings = 1;
    @Column(columnDefinition = "nvarchar(max)")
    private String note;
    @ManyToMany
    @JoinTable(
            name = "tag_dish",
            joinColumns = @JoinColumn(name = "dish_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @JsonBackReference
    private Set<Tag> tags = new HashSet<>();

    @OneToMany(mappedBy = "dish")
    @JsonBackReference
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "dish")
    @JsonBackReference
    private List<Favorite> favorites;

    @OneToMany(mappedBy = "dish")
    @JsonBackReference
    private List<Report> reports;

    @ManyToOne
    @JoinColumn(name = "cooker_id")
    @JsonManagedReference
    private Cooker cooker;

    /*
     * Customized
     */
    public void setCookerId(Long cookerId){
        Cooker cooker = new Cooker();
        cooker.setId(cookerId);
        this.cooker = cooker;
    }
    public void setTagId(List<Long> listTagId){
        if(this.tags!=null)
            this.tags.clear();
        for(Long tagId : listTagId) {
            Tag tag = new Tag();
            tag.setId(tagId);
            if (this.tags != null) {
                this.tags.add(tag);
            } else {
                this.tags = new HashSet<>();
                this.tags.add(tag);
            }
        }
    }
}
