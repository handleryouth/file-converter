package com.example.converterjob.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.converterjob.repository.VideoQueueRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VideoConverterService {

    private final VideoQueueRepository videoQueueRepository;

    @Scheduled(cron = "0 0/2 * * * ?") // Every minute
    public void processVideoQueue() {
        // LocalDateTime now = LocalDateTime.now();
        // List<VideoQueue> videoQueues =
        // videoQueueRepository.findByStatusAndRequestedAt(0, now);
        for (int i = 0; i < 5; i++) {
            try {
                Thread.sleep(5000); // Simulate time-consuming task
                System.out.println("Processing video " + i);
                // videoQueue.setStatus(1); // Mark as completed
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("Video processing failed");
                // videoQueue.setStatus(-1); // Mark as failed
            } finally {
                System.out.println("Finished processing video " + i);
            }

            // videoQueueRepository.save(videoQueue);
        }
    }

}
