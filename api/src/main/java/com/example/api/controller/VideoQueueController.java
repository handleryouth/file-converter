package com.example.api.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.request.AddToQueueVideoDTO;
import com.example.api.dto.response.VideoDto;
import com.example.api.service.VideoQueueService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/video")
public class VideoQueueController {

    @Value("${file.upload-dir.video}")
    private String uploadDirVideo;

    private final VideoQueueService videoQueueService;

    public VideoQueueController(VideoQueueService videoQueueService) {
        this.videoQueueService = videoQueueService;
    }

    @GetMapping("/get-queue-list")
    public ResponseEntity<List<VideoDto>> getQueueList() {
        List<VideoDto> result = videoQueueService.getAllVideoQueues();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/get-queue-details")
    public ResponseEntity<VideoDto> getQueueDetails(@RequestParam UUID id) {
        VideoDto result = videoQueueService.getVideoQueueDetails(id);
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/add-to-queue", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Null> addVideoToQueue(@ModelAttribute @Valid AddToQueueVideoDTO detail) {

        File directory = new File(uploadDirVideo);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String newFileName = System.currentTimeMillis() + "_" + detail.file().getOriginalFilename();

        try {
            File file = new File(uploadDirVideo + File.separator + newFileName);
            detail.file().transferTo(file);
            videoQueueService.addToQueue(detail.fileName(), detail.videoFormat());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(null);

    }

}
