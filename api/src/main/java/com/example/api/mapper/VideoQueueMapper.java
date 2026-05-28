package com.example.api.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.example.api.dto.response.VideoDto;

import com.example.api.model.VideoQueue;

@Mapper(componentModel = "spring")
public interface VideoQueueMapper {
    VideoDto toVideoDto(VideoQueue videoQueue);

    List<VideoDto> toVideoDtoList(List<VideoQueue> videoQueues);
}
