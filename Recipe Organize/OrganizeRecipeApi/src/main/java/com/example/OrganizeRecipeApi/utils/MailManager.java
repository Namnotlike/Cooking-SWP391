package com.example.OrganizeRecipeApi.utils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.FileNotFoundException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

@Component
public class MailManager {
    static final String ADMIN_NAME = "ORGANIZE_APP";

    static final String ADMIN_MAIL = "Icoffeeads@gmail.com";

    @Autowired
    private JavaMailSender javaMailSender;
    public void sendEmail(String sendTo, String sendText, String sendTitle) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setTo(sendTo);
            helper.setText(sendText,true);
            helper.setSubject(sendTitle);

            javaMailSender.send(message);
        }catch (MessagingException ex){
            ex.printStackTrace();
        }
    }

    public void notificationEmailVerify(String fullName,String toEmail,String digitCode) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat sdfTime = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        DecimalFormat df = new DecimalFormat("###,###");
        String sendTo = toEmail;
        String sendTitle = "["+ADMIN_NAME+"] Requires authentication #";
        String sendText = readFileHtml("verify_email.html");
        //SET INFO
        sendText = sendText.replace("{userEmail}",fullName);
        sendText = sendText.replace("{digitCode}",digitCode);


        String finalSendText = sendText;
        new Thread(new Runnable() {
            @Override
            public void run() {
                sendEmail(sendTo, finalSendText,sendTitle);
            }
        }).start();
    }

    public void notificationEmailForgotVerify(String fullName,String toEmail,String digitCode) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        SimpleDateFormat sdfTime = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        DecimalFormat df = new DecimalFormat("###,###");
        String sendTo = toEmail;
        String sendTitle = "["+ADMIN_NAME+"] Requires forgot password verify #";
        String sendText = readFileHtml("verify_email.html");
        //SET INFO
        sendText = sendText.replace("{userEmail}",fullName);
        sendText = sendText.replace("{digitCode}",digitCode);


        String finalSendText = sendText;
        new Thread(new Runnable() {
            @Override
            public void run() {
                sendEmail(sendTo, finalSendText,sendTitle);
            }
        }).start();
    }

    private String readFileHtml(String fileName){
        String PATH = "html_email/"+fileName;
        try {
            File myObj = new File(PATH);
            Scanner myReader = new Scanner(myObj);
            String content = "";
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                content += data;
            }
            myReader.close();
            return content.trim();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return "";
    }
}
