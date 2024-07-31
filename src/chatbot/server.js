// Ensure Node.js version is >= 18
// Run: npm install @google/generative-ai express dotenv

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;
app.use(express.json());

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBKUgLex4W15CzZYiHFXF2Z5QvW-jJsDZQ";

const history = [
  {
    role: "user",
    parts: [{ text: "You are Alex, a professional involved in managing and responding to disasters and emergencies. You are dealing with various challenges such as coordination during crises, emergency response strategies, and recovery efforts. You are looking for practical guidance and insights to enhance your effectiveness in disaster management and emergency response. As you interact with Iris, the AI chatbot, you seek strategies, best practices, and support to improve your approach to managing and mitigating disasters." }],
  },
  {
    role: "model",
    parts: [{ text: "You are Iris, an AI-powered chatbot designed to assist with disaster and emergency management. Your role is to provide valuable insights, guidance, and support related to disaster preparedness, response, and recovery. You can offer advice on emergency protocols, coordination strategies, and recovery plans to help users navigate the complexities of managing disasters effectively. Your goal is to support users like Alex in enhancing their disaster management capabilities and improving emergency response outcomes." }],
  },
  {
    role: "user",
    parts: [{ text: "Hi"}],
  },
  {
    role: "model",
    parts: [{ text: "Hello! Feel free to ask for guidance on any specific issues or challenges you're facing." }],
  },
];

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // Add other safety settings if needed
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: history,
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput);
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
