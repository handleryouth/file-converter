package com.example.api.validator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.FIELD })
// @Retention(RetentionPolicy.RUNTIME) indicates that the annotation will be
// available at runtime, which is necessary for validation to work.
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = { ValidMultipartValidator.class })
// if the interface is provided with @, it is treated as an annotation, and the
// @interface keyword is used to define a custom annotation type. --- IGNORE ---
// This custom annotation is provided with default value, and if we add
// constraint annotation to the field, we can override the default value. ---
// IGNORE ---
public @interface ValidMultipartFile {

    long maxSize() default 300 * 1024 * 1024;

    String message() default "Invalid file";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}