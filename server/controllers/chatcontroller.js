require('dotenv').config()

const googleGenAi = require('@google/genai')
const ai = new googleGenAi.GoogleGenAI({
    apiKey: process.env.API_KEY
})

async function chatHandler(req, res, next) {
    try {
        let data = req.body.data
        data = data.trim()

        if (!data) {
            return res.status(400).json({ message: 'Message required' })
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: data
        })

        if (!response.text) { 
            return res.status(400).json({ message: "Didn't get any response" })
        }

        return res.status(200).json({ message: 'Generated response✅', data: response.text })

    } catch (err) {
        next(err)
    }
}

module.exports = { chatHandler };
