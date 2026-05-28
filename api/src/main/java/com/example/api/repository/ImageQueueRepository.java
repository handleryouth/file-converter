package com.example.api.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.api.model.ImageQueue;

@Repository
public interface ImageQueueRepository extends CrudRepository<ImageQueue, UUID> {
}
