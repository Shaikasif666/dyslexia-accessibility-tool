const textContent = document.getElementById('text-content');
const fontSizeInput = document.getElementById('font-size');
const lineSpacingInput = document.getElementById('line-spacing');
const readTextButton = document.getElementById('read-text');

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

// Text-to-Speech Feature
readTextButton.addEventListener('click', function() {
  const text = document.querySelectorAll('.highlightable');
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = Array.from(text).map(el => el.innerText).join(' ');
  window.speechSynthesis.speak(utterance);
});
