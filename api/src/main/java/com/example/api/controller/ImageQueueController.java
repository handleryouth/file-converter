package com.example.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.AddToQueueDTO;
import com.example.api.model.ImageQueue;
import com.example.api.service.ImageQueueService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/image")
public class ImageQueueController {

    private final ImageQueueService imageQueueService;

    public ImageQueueController(ImageQueueService imageQueueService) {
        this.imageQueueService = imageQueueService;
    }

    @GetMapping("/get-queue-list")
    public ResponseEntity<List<ImageQueue>> getQueueList() {
        List<ImageQueue> result = imageQueueService.getAllImageQueues();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add-to-queue")
    public ResponseEntity<Null> postMethodName(@Valid @RequestBody AddToQueueDTO entity) {
        imageQueueService.addToQueue(entity.fileName(), entity.imageFormat());
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

}
