package com.example.api.dto.response;

public record ImageDto(String fileName, String id, String imageFormat, String requestedAt, Integer status) {
}
