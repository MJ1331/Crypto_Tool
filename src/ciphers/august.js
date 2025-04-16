// August Cipher
export const augustEncrypt = (text, key) => {
    let result = '';
    let keyIndex = 0;
    const keyLength = key.length;
  
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
  
      if (/[A-Za-z]/.test(char)) {
        const charCode = char.charCodeAt(0);
        const keyChar = key[keyIndex % keyLength];
        const shift = keyChar.toLowerCase().charCodeAt(0) - 97;
  
        // Encrypt uppercase letters
        if (char >= 'A' && char <= 'Z') {
          result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        }
        // Encrypt lowercase letters
        else if (char >= 'a' && char <= 'z') {
          result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        }
  
        keyIndex++;
      } else {
        result += char; // Non-alphabet characters remain the same
      }
    }
  
    return result;
  };
  
  export const augustDecrypt = (text, key) => {
    let result = '';
    let keyIndex = 0;
    const keyLength = key.length;
  
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
  
      if (/[A-Za-z]/.test(char)) {
        const charCode = char.charCodeAt(0);
        const keyChar = key[keyIndex % keyLength];
        const shift = keyChar.toLowerCase().charCodeAt(0) - 97;
  
        // Decrypt uppercase letters
        if (char >= 'A' && char <= 'Z') {
          result += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
        }
        // Decrypt lowercase letters
        else if (char >= 'a' && char <= 'z') {
          result += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
        }
  
        keyIndex++;
      } else {
        result += char; // Non-alphabet characters remain the same
      }
    }
  
    return result;
  };
  