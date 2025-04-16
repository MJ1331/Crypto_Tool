function charToInt(ch) {
  return ch.charCodeAt(0) - 'A'.charCodeAt(0);
}

function intToChar(n) {
  return String.fromCharCode((n % 26) + 'A'.charCodeAt(0));
}

function getDeterminant(matrix) {
  return ((matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0])) % 26;
}

function modInverse(a) {
  a = a % 26;
  for (let x = 1; x < 26; x++) {
      if ((a * x) % 26 === 1) return x;
  }
  return -1;
}

function generateInverseKey(keyMatrix) {
  const det = getDeterminant(keyMatrix);
  const invDet = modInverse(det);
  if (invDet === -1) return null;

  let inverse = [
      [( keyMatrix[1][1] * invDet) % 26, (-keyMatrix[0][1] * invDet) % 26],
      [(-keyMatrix[1][0] * invDet) % 26, ( keyMatrix[0][0] * invDet) % 26]
  ];

  // Fix negatives
  for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++)
          if (inverse[i][j] < 0) inverse[i][j] += 26;

  return inverse;
}

function encrypt(plaintext, keyMatrix) {
  let text = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  if (text.length % 2 !== 0) text += 'X';

  let cipher = '';
  for (let i = 0; i < text.length; i += 2) {
      let v = [charToInt(text[i]), charToInt(text[i + 1])];
      let r = [
          (keyMatrix[0][0] * v[0] + keyMatrix[0][1] * v[1]) % 26,
          (keyMatrix[1][0] * v[0] + keyMatrix[1][1] * v[1]) % 26
      ];
      cipher += intToChar(r[0]) + intToChar(r[1]);
  }
  return cipher;
}

function decrypt(ciphertext, keyMatrix) {
  const inverseKey = generateInverseKey(keyMatrix);
  if (!inverseKey) {
      return "Key matrix is not invertible.";
  }

  let plain = '';
  for (let i = 0; i < ciphertext.length; i += 2) {
      let v = [charToInt(ciphertext[i]), charToInt(ciphertext[i + 1])];
      let r = [
          (inverseKey[0][0] * v[0] + inverseKey[0][1] * v[1]) % 26,
          (inverseKey[1][0] * v[0] + inverseKey[1][1] * v[1]) % 26
      ];
      plain += intToChar(r[0]) + intToChar(r[1]);
  }
  return plain;
}

// Export functions
export { encrypt, decrypt };
