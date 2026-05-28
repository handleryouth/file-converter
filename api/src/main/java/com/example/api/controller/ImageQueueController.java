package com.example.api.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.AddToQueueDTO;
import com.example.api.dto.ImageDto;
import com.example.api.service.ImageQueueService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;

import java.io.File;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/image")
public class ImageQueueController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final ImageQueueService imageQueueService;

    public ImageQueueController(ImageQueueService imageQueueService) {
        this.imageQueueService = imageQueueService;
    }

    @GetMapping("/get-queue-list")
    public ResponseEntity<List<ImageDto>> getQueueList() {
        List<ImageDto> result = imageQueueService.getAllImageQueues();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/get-queue-detail")
    public ResponseEntity<ImageDto> getDetailQueue(@RequestParam(required = true) UUID id) {
        ImageDto result = imageQueueService.getImageQueueById(id);
        if (result == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/add-to-queue", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Null> postMethodName(
            @ModelAttribute @Valid AddToQueueDTO detail) {

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String newFileName = System.currentTimeMillis() + "_" + detail.file().getOriginalFilename();

        try {
            File file = new File(uploadDir + File.separator + newFileName);
            detail.file().transferTo(file);
            imageQueueService.addToQueue(detail.fileName(), detail.imageFormat());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

}
