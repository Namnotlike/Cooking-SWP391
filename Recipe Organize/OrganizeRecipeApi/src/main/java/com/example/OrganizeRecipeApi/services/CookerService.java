package com.example.OrganizeRecipeApi.services;

import com.example.OrganizeRecipeApi.convertors.CookerConverter;
import com.example.OrganizeRecipeApi.dtos.CookerDTO;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Customer;
import com.example.OrganizeRecipeApi.entities.Dish;
import com.example.OrganizeRecipeApi.repositories.CookerRepository;
import com.example.OrganizeRecipeApi.repositories.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CookerService {
    @Autowired
    private CookerRepository cookerRepository;
    @Autowired
    private CookerConverter cookerConverter;

    public int sumViewed(Long cookerId){
        return cookerRepository.sumViewed(cookerId);
    }

    public List<CookerDTO> findByCookerName(String keyword,int page,int size){
        int offset = (page - 1) * size;
        return cookerConverter.objectToArrayDTO(cookerRepository.findByCookerName(keyword,offset,size));
    }

    public Cooker insert(Cooker cooker){
        cooker.setId(0l);
        Cooker inserted =  cookerRepository.save(cooker);
        return inserted;
    }

    public Cooker findByUsername(String username) {
        List<Cooker> list = cookerRepository.findByUsername(username);
        if(list!=null && !list.isEmpty()){
            return list.get(0);
        }
        return null;
    }

    public Cooker findById(Long id) {
        Optional<Cooker> opt = cookerRepository.findById(id);
        if(opt.isPresent())
            return opt.get();
        return null;
    }

    public Cooker save(Cooker cooker) {
        return cookerRepository.save(cooker);
    }

    public List<Cooker> findByAccountStatus(String status){
        return cookerRepository.findByAccountStatus(status);
    }

    public List<Cooker> findByStatus(String accountStatus, boolean status){
        List<Cooker> founded = cookerRepository.findByStatus(accountStatus,status);
        return founded;
    }

    public List<CookerDTO> findByDishCountDesc(int page, int size){
        int offset = (page - 1) * size;
        return cookerConverter.objectToArrayDTO(cookerRepository.findByDishCountDesc(offset,size));
    }
}
