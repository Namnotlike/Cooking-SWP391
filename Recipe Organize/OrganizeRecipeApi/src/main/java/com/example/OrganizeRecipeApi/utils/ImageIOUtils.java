package com.example.OrganizeRecipeApi.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ConcurrentModificationException;
import java.util.UUID;

@Component
public class ImageIOUtils {
    @Value("${storage.image.path}")
    String IMG_PATH;
    public void writeImage(MultipartFile multipartFile, String fileName) {
        try {
            File directory = new File(IMG_PATH);
            if(!directory.exists()){
                directory.mkdirs();
            }
            InputStream initialStream = multipartFile.getInputStream();
            byte[] buffer = new byte[initialStream.available()];
            initialStream.read(buffer);

            File targetFile = new File(IMG_PATH+"/"+fileName+".png");

            try (OutputStream outStream = new FileOutputStream(targetFile)) {
                outStream.write(buffer);
                outStream.close();
            }
            initialStream.close();
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    public void copyImage(String fileNameSource, String fileNameDestination) {
        try {
            File sourceFile = new File(IMG_PATH+"/"+fileNameSource+".png");
            File destinationFile = new File(IMG_PATH+"/"+fileNameDestination+".png");

            // Tạo luồng đọc từ file nguồn
            InputStream inputStream = new FileInputStream(sourceFile);

            // Tạo luồng ghi vào file đích
            OutputStream outputStream = new FileOutputStream(destinationFile);

            // Đọc dữ liệu từ luồng đầu vào và ghi vào luồng đầu ra
            byte[] buffer = new byte[1024];
            int length;
            while ((length = inputStream.read(buffer)) > 0) {
                outputStream.write(buffer, 0, length);
            }

            // Đóng luồng
            inputStream.close();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void deleteImage(String fileName){
        try {
            File myObj = new File(IMG_PATH+"/" + fileName + ".png");
            if (myObj.exists() && myObj.delete()) {

            } else {
                System.out.println("Failed to delete the file: " + fileName);
            }
        }catch (ConcurrentModificationException e){
        }
    }

    public String getUuidFileName(){
        //generates random UUID
        UUID uuid=UUID.randomUUID();
        return uuid.toString();
    }

}
