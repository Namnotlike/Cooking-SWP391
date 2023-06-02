package com.example.OrganizeRecipeApi.utils;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

@Component
public class TextUtil {

    public String convertTitleUrl(String title) {
        String originalString = title;
        String lowerString = originalString.toLowerCase();
        String khongdau = removeVietnameseDiacritics(lowerString);
        String xoakitudacbiet = khongdau.replaceAll("[^\\w\\s]", "");
        String finalString = xoakitudacbiet.replaceAll("\\s+", "-");
        return finalString;
    }

    public String removeVietnameseDiacritics(String str) {
        String temp = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("").replaceAll("đ", "d").replaceAll("Đ", "D");
    }

    public Date parseTimeToDate(String time){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        try {
            Date date = sdf.parse(time);
            return date;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
