const fs = require('fs');
const mime = require('mime-types'); // ⬅️ Add this if not already installed
const { Deepgram } = require('@deepgram/sdk');
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

async function transcribeVideo(filePath) {
    const audioBuffer = fs.readFileSync(filePath);
    const mimetype = mime.lookup(filePath); // auto detect MIME (e.g., video/mp4)

    if (!mimetype) throw new Error('Unable to determine MIME type');

    try {
        const response = await deepgram.transcription.preRecorded(
            { buffer: audioBuffer, mimetype }, // ✅ CORRECT FORMAT
            { punctuate: true, language: 'en' }
        );

        return response.results?.channels?.[0]?.alternatives?.[0]?.transcript || 'No transcript found';
    } catch (error) {
        console.error('Deepgram Error:', error);
        throw new Error('Transcription failed.');
    }
}

module.exports = transcribeVideo;
