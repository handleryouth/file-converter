package com.example.converterjob.utils;

import java.io.File;

import ws.schild.jave.Encoder;
import ws.schild.jave.EncoderException;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.encode.AudioAttributes;
import ws.schild.jave.encode.EncodingAttributes;
import ws.schild.jave.encode.VideoAttributes;

public class VideoConverterOrchestrator {

    public void convertVideo(File source, File target) throws EncoderException {
        // 1. Specify Audio properties
        AudioAttributes audio = new AudioAttributes();
        audio.setCodec("aac");
        audio.setBitRate(128000); // 128 kbps

        // 2. Specify Video properties
        VideoAttributes video = new VideoAttributes();
        video.setCodec("h264");
        video.setBitRate(1600000); // 1.6 Mbps
        video.setFrameRate(30); // 30 FPS

        // 3. Combine into Encoder Attributes schema
        EncodingAttributes attrs = new EncodingAttributes();
        attrs.setOutputFormat("avi");
        attrs.setAudioAttributes(audio);
        attrs.setVideoAttributes(video);

        // 4. Run the encoder process
        Encoder encoder = new Encoder();
        encoder.encode(new MultimediaObject(source), target, attrs);
        System.out.println("JAVE2 conversion done!");
    }

    // Example usage
    public static void main(String[] args) {
        String filePath = "/Volumes/Data 2/web/image-video-compressor/video-uploaded/1780237183567_4k_Thetestdata.mp4";
        File source = new File(filePath);
        File target = new File("/Volumes/Data 2/web/image-video-compressor/video-uploaded-result/converted_video.avi");

        VideoConverterOrchestrator orchestrator = new VideoConverterOrchestrator();
        try {
            orchestrator.convertVideo(source, target);
        } catch (EncoderException e) {
            e.printStackTrace();
        }
    }
}
