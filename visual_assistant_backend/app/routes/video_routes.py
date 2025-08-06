# app/routes/video_routes.py

from flask import Blueprint, request, jsonify
import cv2
import os

video_bp = Blueprint('video_bp', __name__)  # ✅ THIS must match your import

@video_bp.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    video = request.files['video']
    video_path = os.path.join('uploads', video.filename)
    video.save(video_path)

    # Dummy video processing with OpenCV
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps if fps else 0
    cap.release()

    return jsonify({
        'message': 'Video processed successfully',
        'summary': {
            'frame_count': frame_count,
            'fps': fps,
            'duration_seconds': duration
        }
    })
