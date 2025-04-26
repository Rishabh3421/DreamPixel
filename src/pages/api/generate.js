// src/api/generateImage.js
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: import.meta.env.VITE_NEBIUS_API_KEY,
});

export async function generateImage(prompt) {
  try {
    const response = await client.images.generate({
      model: 'stability-ai/sdxl',
      response_format: 'b64_json',
      extra_body: {
        response_extension: 'png',
        width: 1024,
        height: 1024,
        num_inference_steps: 30,
        negative_prompt: '',
        seed: -1,
      },
      prompt: prompt,
    });

    if (response.data && response.data[0]) {
      return response.data[0];
    } else {
      throw new Error('No image data returned');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}
