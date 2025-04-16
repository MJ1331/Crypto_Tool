function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    return null;
  }
  
  export function affineEncrypt(text, a, b) {
    return text.split('').map((char) => {
      if (char.match(/[a-z]/i)) {
        const base = char === char.toUpperCase() ? 65 : 97;
        const x = char.charCodeAt(0) - base;
        return String.fromCharCode(((a * x + parseInt(b)) % 26) + base);
      }
      return char;
    }).join('');
  }
  
  export function affineDecrypt(text, a, b) {
    const a_inv = modInverse(parseInt(a), 26);
    if (a_inv === null) return 'Invalid "a" (no modular inverse)';
    return text.split('').map((char) => {
      if (char.match(/[a-z]/i)) {
        const base = char === char.toUpperCase() ? 65 : 97;
        const y = char.charCodeAt(0) - base;
        return String.fromCharCode(((a_inv * (y - parseInt(b) + 26)) % 26) + base);
      }
      return char;
    }).join('');
  }
  