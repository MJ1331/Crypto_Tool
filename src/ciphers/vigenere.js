export function vigenereCipher(text, key, decrypt = false) {
    if (!key || key.length === 0) return '';
  
    let result = '';
    let keyIndex = 0;
    const fullKey = key.toUpperCase();
  
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const isUpper = c >= 'A' && c <= 'Z';
      const isLower = c >= 'a' && c <= 'z';
  
      if (isUpper || isLower) {
        const base = isUpper ? 65 : 97;
        const textChar = c.charCodeAt(0) - base;
        const keyChar = fullKey[keyIndex % fullKey.length];
        const keyOffset = keyChar.charCodeAt(0) - 65;
  
        let newChar;
        if (decrypt) {
          newChar = (textChar - keyOffset + 26) % 26;
        } else {
          newChar = (textChar + keyOffset) % 26;
        }
  
        result += String.fromCharCode(newChar + base);
        keyIndex++;
      } else {
        result += c; // Keep symbols, punctuation, spaces as is
      }
    }
  
    return result;
  }
  