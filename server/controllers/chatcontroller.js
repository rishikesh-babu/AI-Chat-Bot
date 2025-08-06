const { chatWithContext } = require('../services/chatService');
const { v4: uuidv4 } = require('uuid');

async function chatHandler(req, res) {
  let { sessionId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (!sessionId) {
    sessionId = uuidv4();
  }

  try {
    const reply = await chatWithContext(sessionId, message);
    res.json({ sessionId, reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Chat error' });
  }
}

module.exports = { chatHandler };
