package com.example.converterjob.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.converterjob.model.ImageQueue;

@Repository
public interface ImageQueueRepository extends CrudRepository<ImageQueue, UUID> {
}
