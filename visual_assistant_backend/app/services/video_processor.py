import os
import cv2
import time
from ultralytics import YOLO
from collections import Counter

# Load the heavier YOLOv8 Large model
model = YOLO("yolov8l.pt")

# Define minimum confidence threshold
CONFIDENCE_THRESHOLD = 0.4  # adjust as needed

# Optional: Define specific classes to track (e.g., 'person', 'car')
# Leave as None to include all
ALLOWED_CLASSES = None


def process_video(video_path):
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        raise IOError("Could not open video file")

    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps

    detected_objects = []

    start_time = time.time()

    frame_index = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame)[0]

        for box in results.boxes:
            class_id = int(box.cls[0])
            confidence = float(box.conf[0])

            if confidence < CONFIDENCE_THRESHOLD:
                continue

            class_name = model.names[class_id]

            if ALLOWED_CLASSES is None or class_name in ALLOWED_CLASSES:
                detected_objects.append(class_name)

        frame_index += 1

    cap.release()
    end_time = time.time()

    processing_time = round(end_time - start_time, 2)
    summary = {
        "duration_seconds": duration,
        "fps": fps,
        "frame_count": frame_count,
        "processing_time_sec": processing_time,
        "detected_objects_summary": dict(Counter(detected_objects))
    }

    return summary
