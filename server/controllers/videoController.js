// controllers/videoController.js
const transcribeVideo = require('../services/transcribeVideo');

const transcribeHandler = async (req, res) => {
    try {
        const filePath = req.file.path;
        const transcript = await transcribeVideo(filePath);

        res.status(200).json({ transcript });
    } catch (err) {
        console.error('Transcription Error:', err);
        res.status(500).json({ error: 'Transcription failed' });
    }
};

module.exports = {
    transcribeHandler
};
