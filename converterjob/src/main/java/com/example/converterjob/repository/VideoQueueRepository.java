package com.example.converterjob.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.converterjob.model.VideoQueue;

@Repository
public interface VideoQueueRepository extends CrudRepository<VideoQueue, UUID> {

    @Query("SELECT v FROM VideoQueue v WHERE v.status = :status AND v.requestedAt <= :requestedAt")
    List<VideoQueue> findByStatusAndRequestedAt(int status, LocalDateTime requestedAt);
}
