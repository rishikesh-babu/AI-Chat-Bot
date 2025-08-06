const express = require('express');
const multer = require('multer');
const { chatHandler } = require('../controllers/chatcontroller');
const transcribeVideo = require('../services/transcribeVideo');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Logger Middleware (optional)
router.use((req, res, next) => {
    console.log('Routes: API');
    next();
});

// ---- POST /api/message ----
router.post('/message', chatHandler);

// ---- POST /api/transcribe ----
router.post('/transcribe', upload.single('video'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const transcript = await transcribeVideo(filePath);
        res.status(200).json({ transcript });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Transcription failed' });
    }
});

module.exports = router;
