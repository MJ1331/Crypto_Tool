export const beaufortEncrypt = (text, key) => {
  if (!text || !key) return ''; // Ensure text and key are valid
  text = text.toLowerCase();
  key = key.toLowerCase(); // Make sure key is always a string
  const keyLength = key.length;
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const textChar = text.charCodeAt(i) - 97;
    const keyChar = key.charCodeAt(i % keyLength) - 97;
    result += String.fromCharCode(((keyChar - textChar + 26) % 26) + 97);
  }
  return result;
};

export const beaufortDecrypt = (text, key) => {
  return beaufortEncrypt(text, key); // Beaufort encryption and decryption are the same
};
