package com.example.converterjob.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.converterjob.repository.ImageQueueRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ImageConverterService {

    private final ImageQueueRepository imageQueueRepository;

    @Scheduled(cron = "0 0/1 * * * ?") // Every minute
    public void processImageQueue() {
        for (int i = 0; i < 5; i++) {
            try {
                Thread.sleep(5000); // Simulate time-consuming task
                System.out.println("Processing image " + i);
                // imageQueue.setStatus(1); // Mark as completed
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Image processing failed");
                // imageQueue.setStatus(-1); // Mark as failed
            } finally {
                System.out.println("Finished processing image " + i);
            }

            // imageQueueRepository.save(imageQueue);
        }
    }

}
