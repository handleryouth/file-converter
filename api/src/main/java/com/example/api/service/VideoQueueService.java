package com.example.api.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.api.dto.response.VideoDto;
import com.example.api.mapper.VideoQueueMapper;
import com.example.api.model.VideoQueue;
import com.example.api.repository.VideoQueueRepository;
import org.jspecify.annotations.Nullable;

@Service
public class VideoQueueService {

    private VideoQueueRepository videoQueueRepository;

    private VideoQueueMapper videoQueueMapper;

    public VideoQueueService(VideoQueueRepository videoQueueRepository, VideoQueueMapper videoQueueMapper) {
        this.videoQueueRepository = videoQueueRepository;
        this.videoQueueMapper = videoQueueMapper;
    }

    public List<VideoDto> getAllVideoQueues() {
        var videoQueues = videoQueueRepository.findAll();
        return videoQueueMapper.toVideoDtoList((List<VideoQueue>) videoQueues);
    }

    @Nullable
    public VideoDto getVideoQueueDetails(UUID id) {
        var videoQueue = videoQueueRepository.findById(id).orElse(null);
        return videoQueue != null ? videoQueueMapper.toVideoDto(videoQueue) : null;
    }

    public void addToQueue(String fileName, String videoFormat) {
        VideoQueue newQueueItem = new VideoQueue();
        newQueueItem.setFileName(fileName);
        newQueueItem.setVideoFormat(videoFormat);
        newQueueItem.setStatus(0);
        newQueueItem.setRequestedAt(java.time.LocalDateTime.now());
        videoQueueRepository.save(newQueueItem);
    }
}
