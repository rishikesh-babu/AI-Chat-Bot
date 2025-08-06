import os

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')

# Configuration settings
class Config:
    SECRET_KEY = "your-secret-key"
    UPLOAD_FOLDER = UPLOAD_FOLDER
    MAX_CONTENT_LENGTH = 200 * 1024 * 1024  # Max 200MB for video
