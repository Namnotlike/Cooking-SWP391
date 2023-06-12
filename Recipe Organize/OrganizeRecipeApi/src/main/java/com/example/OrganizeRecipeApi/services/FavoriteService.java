package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.entities.Favorite;
import com.example.OrganizeRecipeApi.entities.Tag;
import com.example.OrganizeRecipeApi.repositories.FavoriteRepository;
import com.example.OrganizeRecipeApi.repositories.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;



    public Favorite insert(Favorite favorite) {
        favorite.setId(0l);
        return favoriteRepository.save(favorite);
    }

    public List<Favorite> findAll() {
        return favoriteRepository.findAll();
    }

    public Boolean isLoved(Long accountId, Long dishId) {
        List<Favorite> favorites = favoriteRepository.findByDishIdAndAccountId(accountId,dishId);
        if(favorites==null || favorites.isEmpty())
            return false;
        return true;
    }

    public Favorite findByAccountIdAndDishId(Long accountId, Long dishId) {
        List<Favorite> favorites = favoriteRepository.findByDishIdAndAccountId(accountId,dishId);
        if(favorites==null || favorites.isEmpty())
            return null;
        return favorites.get(0);
    }

    public void deleteById(Long id) {
        favoriteRepository.deleteById(id);
    }

    public Favorite save(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    public Favorite findById(Long id) {
        Optional<Favorite> opt = favoriteRepository.findById(id);
        if(opt.isPresent())
            return opt.get();
        return null;
    }

    public List<Favorite> findByAccountId(Long id) {
        return favoriteRepository.findByAccountId(id);
    }
    public List<Favorite> findByDishId(Long dishId){
        List<Favorite> founded = favoriteRepository.findByDishId(dishId);
        return founded;
    }
}
