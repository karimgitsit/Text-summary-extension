import { CHATGPT_API_KEY } from './config.js';
function handleHighlightedText() {
  const highlightedText = window.getSelection().toString();
  chrome.storage.sync.set({ "highlightedText": highlightedText });
}

document.addEventListener("mouseup", handleHighlightedText);
