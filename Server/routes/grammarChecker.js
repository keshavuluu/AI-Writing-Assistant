const express = require("express");
const grammarCheck = express.Router();
const axios = require("axios");

grammarCheck.post("/", async (req, res) => {
  const { text } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "OpenAI API key is not configured" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // Using the specified model
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that checks and corrects grammar errors in the following text. Only return the corrected text without any additional comments or context.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const correctedText = response.data.choices[0].message.content.trim();
    res.json({ correctedText });
  } catch (error) {
    console.error(
      "Error checking grammar:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Error checking grammar",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = grammarCheck;
