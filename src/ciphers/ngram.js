// ngram.js

// Helper to split text into n-grams
function splitNGrams(text, n) {
  let ngrams = [];
  for (let i = 0; i < text.length; i += n) {
    ngrams.push(text.slice(i, i + n));
  }
  return ngrams;
}

// Encrypt by reversing each n-gram and applying a Caesar shift (optional customization)
export function ngramEncrypt(text, n = 2) {
  const cleaned = text.replace(/[^A-Za-z]/g, '').toUpperCase();
  const ngrams = splitNGrams(cleaned, n);
  const encrypted = ngrams.map(group => {
    let reversed = group.split('').reverse().join('');
    return reversed;
  });
  return encrypted.join(' ');
}

// Decrypt by reversing each encrypted n-gram (assuming same logic as encryption)
export function ngramDecrypt(ciphertext, n = 2) {
  const groups = ciphertext.split(' ');
  const decrypted = groups.map(group => group.split('').reverse().join(''));
  return decrypted.join('');
}
