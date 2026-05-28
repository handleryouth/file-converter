package com.example.api.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.example.api.dto.ImageDto;
import com.example.api.model.ImageQueue;

@Mapper(componentModel = "spring")
public interface ImageQueueMapper {
    ImageDto toImageDto(ImageQueue imageQueue);

    List<ImageDto> toImageDtoList(List<ImageQueue> imageQueues);
}
