const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/openai', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.sk-proj-9VqHONylbMwzqKyHyseoT3BlbkFJjnd7tZyku2zMhdPfdMww}`
      }
    });

    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: 'Error communicating with OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
