package com.example.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.response.VideoDto;
import com.example.api.service.VideoQueueService;

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
}
