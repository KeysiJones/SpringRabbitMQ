package com.keysijones.kdaily.controllers;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.HeadersExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.core.BindingBuilder.DestinationConfigurer;
import org.springframework.amqp.core.BindingBuilder.HeadersExchangeMapConfigurer;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping(value = "/")
@CrossOrigin
public class HomePageController {

    private final RabbitTemplate rabbitTemplate;

    static final String fanoutExchangeName = "keysi-fanout-exchange";
    static final String directExchangeName = "keysi-direct-exchange";
    static final String topicExchangeName = "keysi-topic-exchange";
    static final String headersExchangeName = "keysi-headers-exchange";

    static final String queueName = "hello";

    public HomePageController(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @GetMapping("/")
    public String homePage() {
        return "Sistema feito para aprender RabbitMQ na prática";
    }

    @Bean
    Queue queue() {
        return new Queue(queueName, false);
    }

    @Bean
    TopicExchange topicExchange() {
        return new TopicExchange(topicExchangeName);
    }

    @Bean
    FanoutExchange fanoutExchange() {
        return new FanoutExchange(fanoutExchangeName);
    }

    @Bean
    DirectExchange directExchange() {
        return new DirectExchange(directExchangeName);
    }

    @Bean
    HeadersExchange headersExchange() {
        return new HeadersExchange(headersExchangeName);
    }

    // //Liga a queue na exchange
    // @Bean
    // Binding binding(Queue queue, DirectExchange exchange) {
    // //A routing key desta ligação será lalala-routing-key
    // return BindingBuilder.bind(queue).to(exchange).with("lalala-routing-key");
    // }

    // @PostMapping("/messages/new")
    // public ResponseEntity<String> enviarMensagemDirect(String mensagem) {
    // //A mensagem é enviada para a queue minhaQueue por conta do binding e para a routing key lalala-routing-key
    // rabbitTemplate.convertAndSend(directExchangeName, "lalala-routing-key", mensagem);

    // return ResponseEntity.ok().body("Mensagem enviada: " + "' " + mensagem + " '");
    // }

    // //As topic exchanges respeitam um padrão de routing keys, por exemplo...
    // //Este binding manda as mensagens para a queue minhaQueue caso a routing key da mensagem conter spring no nome
    
    // @Bean
    // Binding binding(Queue queue, TopicExchange exchange) {
    // return BindingBuilder.bind(queue).to(exchange).with("spring.#");
    // }

    // @PostMapping("/messages/new")
    // public ResponseEntity<String> enviarMensagemTopic(String mensagem) {
    // //A mensangem tem uma routing key que contém spring no nome, então a mensagem será entregue à queue minhaQueue.
    // rabbitTemplate.convertAndSend(topicExchangeName, "spring-boot", mensagem);

    // return ResponseEntity.ok().body("Mensagem enviada: " + "' " + mensagem + " '");
    // }

    @Bean
    Binding binding(Queue queue, FanoutExchange exchange) {
    return BindingBuilder.bind(queue).to(exchange);
    }

    //A Fanout Exchange ignora a RoutingKey e envia a mensagem para todas as queues disponíveis
    @PostMapping("/messages/new")
    public ResponseEntity<String> enviarMensagemFanOut(String mensagem) {
    rabbitTemplate.convertAndSend(fanoutExchangeName, "", mensagem);

    return ResponseEntity.ok().body("Mensagem enviada: " + mensagem);
    }

    // @Bean
    // HeadersExchangeMapConfigurer binding(Queue queue, HeadersExchange exchange) {
    //   return BindingBuilder.bind(queue).to(exchange);
    // }

    // @PostMapping("/messages/new")
    // public ResponseEntity<String> enviarMensagemHeaders(String mensagem) {
    //     rabbitTemplate.convertAndSend(headersExchangeName, "spring-boot", mensagem);

    //     return ResponseEntity.ok().body("Mensagem enviada: " + "' " + mensagem + " '");
    // }

    @RabbitListener(queues = queueName)
    public void listen(String msgRecebida) {
        System.out.println("Mensagem recebida na fila " + queueName + " : " + msgRecebida);
    }

}
