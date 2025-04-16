// Gronsfeld Cipher
export const gronsfeldEncrypt = (text, key) => {
    let result = '';
    key = key.toString();
    let keyIndex = 0;
  
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
  
      if (/[A-Za-z]/.test(char)) {
        let charCode = char.charCodeAt(0);
        let shift = parseInt(key[keyIndex % key.length], 10);
  
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
  
  export const gronsfeldDecrypt = (text, key) => {
    let result = '';
    key = key.toString();
    let keyIndex = 0;
  
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
  
      if (/[A-Za-z]/.test(char)) {
        let charCode = char.charCodeAt(0);
        let shift = parseInt(key[keyIndex % key.length], 10);
  
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
        result += char; 
      }
    }
    return result;
  };
  