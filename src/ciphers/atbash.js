export function atbashCipher(text) {
    return text.split('').map((char) => {
      if (char.match(/[a-z]/i)) {
        const base = char === char.toUpperCase() ? 65 : 97;
        return String.fromCharCode(base + (25 - (char.charCodeAt(0) - base)));
      }
      return char;
    }).join('');
  }
  