# run.py

from flask import Flask
from app.routes.video_routes import video_bp  # ✅ this must match the Blueprint name above

app = Flask(__name__)
app.register_blueprint(video_bp)

if __name__ == '__main__':
    app.run(debug=True)
