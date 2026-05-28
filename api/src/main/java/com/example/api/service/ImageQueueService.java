package com.example.api.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.api.dto.ImageDto;
import com.example.api.mapper.ImageQueueMapper;
import com.example.api.model.ImageQueue;
import com.example.api.repository.ImageQueueRepository;

@Service
public class ImageQueueService {

    private final ImageQueueRepository imageQueueRepository;

    private ImageQueueMapper imageQueueMapper;

    public ImageQueueService(ImageQueueRepository imageQueueRepository, ImageQueueMapper imageQueueMapper) {
        this.imageQueueRepository = imageQueueRepository;
        this.imageQueueMapper = imageQueueMapper;
    }

    public List<ImageDto> getAllImageQueues() {
        var imageQueues = imageQueueRepository.findAll();
        return imageQueueMapper.toImageDtoList((List<ImageQueue>) imageQueues);
    }

    public ImageDto getImageQueueById(UUID id) {
        var imageQueue = imageQueueRepository.findById(id).orElse(null);
        if (imageQueue == null) {
            return null;
        }
        return imageQueueMapper.toImageDto(imageQueue);
    }

    public void addToQueue(String fileName, String imageFormat) {
        ImageQueue newQueueItem = new ImageQueue();
        newQueueItem.setFilename(fileName);
        newQueueItem.setImageFormat(imageFormat);
        newQueueItem.setStatus(0);
        newQueueItem.setRequestedAt(java.time.LocalDateTime.now());
        imageQueueRepository.save(newQueueItem);
    }
}
