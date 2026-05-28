package com.example.api.dto;

import jakarta.validation.constraints.NotBlank;

public record AddToQueueDTO(@NotBlank(message = "File name is required") String fileName,
        @NotBlank(message = "Image format is required") String imageFormat) {
}
