package com.example.api.utils;

import java.util.HashMap;
import java.util.Map;

import org.jspecify.annotations.Nullable;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalResponseInterceptor implements ResponseBodyAdvice<Object> {

    @Override
    // Tell Spring WHICH responses to intercept. Return true for everything.
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        if (returnType.getParameterType().equals(String.class)) {
            return false;
        }
        return true;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGlobalException(Exception ex) {
        if (ex instanceof NoResourceFoundException) {
            return ResponseEntity.status(404).body(ApiResponse.error("Resource not found"));
        } else if (ex instanceof MethodArgumentNotValidException methodArgumentNotValidException) {
            Map<String, String> errors = new HashMap<>();
            methodArgumentNotValidException.getBindingResult().getFieldErrors()
                    .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
            return ResponseEntity.status(400).body(ApiResponse.error("Errors: " + errors.toString()));
        } else {
            return ResponseEntity.status(500).body(ApiResponse.error("An unexpected error occurred"));
        }
    }

    @Override
    // Intercept and rewrite the body before it's sent to the client
    public @Nullable Object beforeBodyWrite(@Nullable Object body, MethodParameter returnType,
            MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType,
            ServerHttpRequest request, ServerHttpResponse response) {

        if (body instanceof ApiResponse) {
            return body;
        }

        return ApiResponse.success(body, "Success");
    }
}
