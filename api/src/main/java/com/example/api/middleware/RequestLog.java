package com.example.api.middleware;

import java.io.IOException;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.api.logger.ServerLogger;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@Order(1)
public class RequestLog extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();
        String clientIp = request.getRemoteAddr();

        ServerLogger.info(this.getClass(), "Incoming request: {} {} from IP: {}", method, path, clientIp);

        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        try {

            filterChain.doFilter(request, response);
        } finally {
            stopWatch.stop();

            long duration = stopWatch.getTotalTimeMillis();
            int status = response.getStatus();
            ServerLogger.info(this.getClass(), "Completed request: {} {} with status: {} in {} ms", method, path,
                    status, duration);
        }

    }

}
