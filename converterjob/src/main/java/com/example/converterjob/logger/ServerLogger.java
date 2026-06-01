package com.example.converterjob.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServerLogger {

    private ServerLogger() {
    }

    public static void info(Class<?> clazz, String message, Object... args) {
        Logger log = LoggerFactory.getLogger(clazz);
        if (log.isInfoEnabled()) {
            log.info(message, args);
        }
    }

    public static void warn(Class<?> clazz, String message, Object... args) {
        Logger log = LoggerFactory.getLogger(clazz);
        if (log.isWarnEnabled()) {
            log.warn(message, args);
        }
    }

    public static void error(Class<?> clazz, String message, Throwable throwable) {
        Logger log = LoggerFactory.getLogger(clazz);
        if (log.isErrorEnabled()) {
            log.error(message, throwable);
        }
    }
}
