package com.example.api.dto.request;

import org.springframework.web.multipart.MultipartFile;

import com.example.api.validator.ValidMultipartFile;

import jakarta.validation.constraints.NotBlank;

public record AddToQueueVideoDTO(@NotBlank(message = "File name is required") String fileName,
        @NotBlank(message = "Video format is required") String videoFormat,
        @ValidMultipartFile() MultipartFile file) {
}
