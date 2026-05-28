package com.example.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.api.model.ImageQueue;
import com.example.api.repository.ImageQueueRepository;

@Service
public class ImageQueueService {

    private final ImageQueueRepository imageQueueRepository;

    public ImageQueueService(ImageQueueRepository imageQueueRepository) {
        this.imageQueueRepository = imageQueueRepository;
    }

    public List<ImageQueue> getAllImageQueues() {
        var imageQueues = imageQueueRepository.findAll();
        return (List<ImageQueue>) imageQueues;
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
