const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();  // Ensure your .env is loaded

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function chatWithContext(message, sessionId) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return {
      sessionId,
      reply: completion.data.choices[0].message.content,
    };
  } catch (error) {
    console.error("OpenAI error:", error.response?.data || error.message);
    throw new Error("Failed to get response from OpenAI.");
  }
}

module.exports = { chatWithContext };
