package com.example.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.api.dto.response.VideoDto;
import com.example.api.mapper.VideoQueueMapper;
import com.example.api.model.VideoQueue;
import com.example.api.repository.VideoQueueRepository;

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

}
