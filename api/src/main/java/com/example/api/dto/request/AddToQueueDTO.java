package com.example.api.dto.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AddToQueueDTO(@NotBlank(message = "File name is required") String fileName,
                @NotBlank(message = "Image format is required") String imageFormat,
                @NotNull(message = "File cannot be missing") MultipartFile file) {
}
