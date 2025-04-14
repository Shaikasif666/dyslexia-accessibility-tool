const textContent = document.getElementById('text-content');
const fontSizeInput = document.getElementById('font-size');
const lineSpacingInput = document.getElementById('line-spacing');
const readTextButton = document.getElementById('read-text');
const toggleFontButton = document.getElementById('toggle-font');

// Focus Mode: Highlight lines on hover
textContent.classList.add('focus-mode');

// Toggle Dyslexia-Friendly Font
let dyslexiaFontEnabled = false;
toggleFontButton.addEventListener('click', () => {
  dyslexiaFontEnabled = !dyslexiaFontEnabled;
  document.body.classList.toggle('dyslexia-font', dyslexiaFontEnabled);
});

// Word Highlighting on Hover
textContent.addEventListener('mouseover', function(e) {
  if (e.target && e.target.classList.contains('highlightable')) {
    e.target.style.backgroundColor = '#fffb87';
  }
});

textContent.addEventListener('mouseout', function(e) {
  if (e.target && e.target.classList.contains('highlightable')) {
    e.target.style.backgroundColor = 'transparent';
  }
});

// Adjust Font Size and Line Spacing
fontSizeInput.addEventListener('input', function() {
  document.querySelectorAll('.highlightable').forEach(el => {
    el.style.fontSize = fontSizeInput.value + 'px';
  });
});

lineSpacingInput.addEventListener('input', function() {
  document.querySelectorAll('.highlightable').forEach(el => {
    el.style.lineHeight = lineSpacingInput.value;
  });
});

// Text-to-Speech Feature with Sentence Highlighting
readTextButton.addEventListener('click', function() {
  const text = document.querySelectorAll('.highlightable');
  const utterance = new SpeechSynthesisUtterance();
  const sentences = Array.from(text).map(el => el.innerText).join(' ').match(/[^\.!\?]+[\.!\?]+/g) || [text];
  let sentenceIndex = 0;

  // Function to speak and highlight the current sentence
  function speakSentence() {
    if (sentenceIndex >= sentences.length) return;

    utterance.text = sentences[sentenceIndex];
    window.speechSynthesis.speak(utterance);

    // Highlight the current sentence
    text.forEach((el, index) => {
      el.style.backgroundColor = 'transparent';
      if (index === sentenceIndex) {
        el.style.backgroundColor = '#d3f8d3'; // Highlight current sentence
      }
    });

    sentenceIndex++;
  }

  // Start reading
  speakSentence();
  utterance.onend = function() {
    speakSentence(); // Move to the next sentence when the current one ends
  };
});
