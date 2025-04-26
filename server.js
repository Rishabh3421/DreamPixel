// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-image', async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    // flatten extra_body into main body
    const { extra_body, ...rest } = req.body;
    const payload = { ...rest, ...extra_body };

    console.log("Payload sent to Nebius:", payload);

    const response = await axios.post('https://api.studio.nebius.com/v1/images/generate', payload, {
      headers: {
        Authorization: `Bearer ${process.env.NEBIUS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error("Nebius error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || 'Failed to generate image' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
