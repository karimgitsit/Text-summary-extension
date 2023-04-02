import { CHATGPT_API_KEY } from './config.js';

const summarizeBtn = document.getElementById('summarize-btn');
const summaryText = document.getElementById('summary-text');
const outputTextArea = document.getElementById('output-text');

summarizeBtn.addEventListener('click', async () => {
  const content = document.getElementById('content').value.trim();

  if (!content) {
    document.getElementById('summary').innerText = 'Please enter some text to summarize.';
    return;
  }

  summarizeBtn.innerText = 'Summarizing...';
  summarizeBtn.disabled = true;

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATGPT_API_KEY}`
      },
      body: JSON.stringify({
        prompt: `summarize:\n${content}`,
        max_tokens: 100,
        temperature: 0.7,
        n: 1,
        stop: '\n'
      })
    });

    const data = await response.json();
    const summary = data.choices[0].text.trim();

    document.getElementById('summary').innerText = summary;
  } catch (error) {
    console.error(error);
    document.getElementById('summary').innerText = 'An error occurred while summarizing the text. Please try again later.';
  }

  summarizeBtn.innerText = 'Summarize';
  summarizeBtn.disabled = false;
});
