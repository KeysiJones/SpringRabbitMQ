package com.keysijones.kdaily.controllers;

import javax.sound.midi.Receiver;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping(value = "/")
@CrossOrigin
public class HomePageController {

    private final RabbitTemplate rabbitTemplate;
    
    public HomePageController(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
        //rabbitTemplate.convertAndSend("minhaQueue", "Oi, eu sou o Keysi Jones !");
    }

    @GetMapping("/")
    public String homePage() {
        return "Sistema feito para aprender RabbitMQ na prática";
    }

    @Bean
    public Queue minhaQueue() {
        return new Queue("minhaQueue", false);
    }

    @PostMapping("/messages/new")
    public ResponseEntity<String> enviarMensagem(String mensagem) {
        System.out.println(mensagem);
        rabbitTemplate.convertAndSend("minhaQueue", mensagem);
        return ResponseEntity.ok().body("Mensagem enviada: " + "' " + mensagem + " '");
    }

    @RabbitListener(queues = "minhaQueue")
    public void listen(String in) {
        System.out.println("Mensagem recebida: " + in);
    }

}
