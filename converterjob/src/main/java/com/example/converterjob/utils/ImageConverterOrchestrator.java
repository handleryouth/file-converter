package com.example.converterjob.utils;

import java.io.File;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Iterator;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.stream.ImageInputStream;
import javax.imageio.stream.ImageOutputStream;

import com.example.converterjob.logger.ServerLogger;

public class ImageConverterOrchestrator {

    public static void convertAndCompress(String inputPath, String outputPath, String formatName, int qualityPercent,
            boolean includeMetadata)
            throws IOException {
        File inputFile = new File(inputPath);
        File outputFile = new File(outputPath);

        ImageInputStream iis = ImageIO.createImageInputStream(inputFile);
        Iterator<ImageReader> readers = ImageIO.getImageReaders(iis);
        if (!readers.hasNext()) {
            iis.close();
            throw new IllegalStateException("No reader found for input image");
        }
        ImageReader reader = readers.next();
        reader.setInput(iis);

        BufferedImage inputImage = reader.read(0);
        IIOMetadata originalMetadata = reader.getImageMetadata(0);

        if ("jpg".equalsIgnoreCase(formatName) || "jpeg".equalsIgnoreCase(formatName)) {
            BufferedImage rgbImage = new BufferedImage(inputImage.getWidth(), inputImage.getHeight(),
                    BufferedImage.TYPE_INT_RGB);
            rgbImage.createGraphics().drawImage(inputImage, 0, 0, java.awt.Color.WHITE, null);
            inputImage = rgbImage;
        }

        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName(formatName);
        if (!writers.hasNext()) {
            throw new IllegalStateException("No writers found for format: " + formatName);
        }
        ImageWriter writer = writers.next();

        ImageWriteParam writeParam = writer.getDefaultWriteParam();
        if (writeParam.canWriteCompressed()) {
            writeParam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);

            writeParam.setCompressionQuality(qualityPercent / 100.0f);
        }

        try (OutputStream os = new FileOutputStream(outputFile);
                ImageOutputStream ios = ImageIO.createImageOutputStream(os)) {

            writer.setOutput(ios);
            writer.write(null, new IIOImage(inputImage, null, includeMetadata ? originalMetadata : null), writeParam);
        } finally {
            writer.dispose();
        }
    }

    public static void main(String[] args) {
        try {
            convertAndCompress("/Volumes/Data 2/web/image-video-compressor/image-uploaded/file_example_PNG_3MB.png",
                    "/Volumes/Data 2/web/image-video-compressor/image-uploaded-result/file_example_JPG_3MB.jpg", "jpg",
                    20, false);
            ServerLogger.info(ImageConverterOrchestrator.class,
                    "Image conversion and compression completed successfully.");
        } catch (IOException e) {
            ServerLogger.error(ImageConverterOrchestrator.class, "Image conversion failed: {}", e);
        }
    }
}
