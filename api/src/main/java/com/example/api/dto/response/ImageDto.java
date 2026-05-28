package com.example.api.dto.response;

public record ImageDto(String filename, String id, String imageFormat, String requestedAt, Integer status) {
}
