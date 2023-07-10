package com.example.OrganizeRecipeApi.convertors;

import com.example.OrganizeRecipeApi.dtos.CookerDTO;
import com.example.OrganizeRecipeApi.entities.Cooker;
import com.example.OrganizeRecipeApi.entities.Dish;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class CookerConverter {
    public List<CookerDTO> objectToArrayDTO(List<Object[]> objects){
        List<CookerDTO> listCooker = new ArrayList<>();
        for(Object[] item: objects){
            CookerDTO cooker = new CookerDTO();
            cooker.setId(((BigDecimal) item[0]).longValue());
            cooker.setFullName((String )item[1]);
            cooker.setImageUrl((String) item[2]);
            cooker.setRank((String) item[3]);
            if(item.length>4) {
                cooker.setDishCount((Integer) item[4]);
            }
            listCooker.add(cooker);
        }
        return listCooker;
    }
}
