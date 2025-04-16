export function caesarEncrypt(text, shift) {
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const base = char === char.toUpperCase() ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - base + parseInt(shift)) % 26) + base);
        }
        return char;
      })
      .join('');
  }
  
  export function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, (26 - parseInt(shift)).toString());
  }
  