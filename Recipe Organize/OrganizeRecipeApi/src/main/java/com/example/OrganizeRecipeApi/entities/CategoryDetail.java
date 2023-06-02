package com.example.OrganizeRecipeApi.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class CategoryDetail extends BaseEntity {
    private String name;
    private String url;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

    @OneToMany(mappedBy = "categoryDetail")
    @JsonBackReference
    List<Dish> dishes;

    public CategoryDetail(String name,Long categoryId,String url) {
        this.name = name;
        Category category = new Category();
        category.setId(categoryId);
        this.category = category;
        this.url = url;
    }
}
