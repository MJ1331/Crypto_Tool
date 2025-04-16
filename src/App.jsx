import React, { useState, useEffect } from 'react';
import { caesarEncrypt, caesarDecrypt } from './ciphers/caesar';
import { atbashCipher } from './ciphers/atbash';
import { vigenereCipher } from './ciphers/vigenere';
import { railFenceCipher } from './ciphers/railfence';
import { affineEncrypt, affineDecrypt } from './ciphers/affine';
import { augustEncrypt, augustDecrypt } from './ciphers/august';
import { gronsfeldEncrypt, gronsfeldDecrypt } from './ciphers/gronsfeld';
import { beaufortEncrypt, beaufortDecrypt } from './ciphers/beaufort';
import { autoclaveEncrypt, autoclaveDecrypt } from './ciphers/autoclave';
import { myszkowskiEncrypt, myszkowskiDecrypt } from './ciphers/myszkowski';
import { ngramEncrypt, ngramDecrypt } from './ciphers/ngram';
import * as Hill from './ciphers/hill';
import { routeEncrypt, routeDecrypt } from './ciphers/route';
import './styles.css';

function parseHillKey(keyStr) {
  const parts = keyStr.split(',').map(n => parseInt(n.trim(), 10));
  if (parts.length !== 4 || parts.some(isNaN)) throw new Error('Invalid key');
  return [
    [parts[0], parts[1]],
    [parts[2], parts[3]],
  ];
}

function App() {
  const [text, setText] = useState('');
  const [keyA, setKeyA] = useState('5');
  const [keyB, setKeyB] = useState('8');
  const [key, setKey] = useState('');
  const [cipher, setCipher] = useState('caesar');
  const [decrypt, setDecrypt] = useState(false);

  const cipherCategories = {
    substitution: {
      name: 'Substitution Ciphers',
      types: {
        single: {
          name: 'Single Substitution',
          ciphers: ['caesar', 'atbash', 'affine']
        },
        poly: {
          name: 'Polyalphabetic Substitution',
          ciphers: ['vigenere', 'beaufort', 'gronsfeld', 'autoclave', 'august', 'hill']
        }
      }
    },
    transposition: {
      name: 'Transposition Ciphers',
      ciphers: ['railfence', 'myszkowski', 'route'] // Added "route" here
    },
    analysis: {
      name: 'Cryptanalysis Tools',
      ciphers: ['ngram']
    }
  };

  const cipherInfo = {
    caesar: {
      name: 'Caesar Cipher',
      description: 'A substitution cipher where each letter is shifted by a fixed number of positions.',
      details: 'Each letter is shifted by a constant value.',
      keyInfo: 'Use a numeric key, e.g., "3".',
      drawback: 'Easy to break using brute-force.'
    },
    atbash: {
      name: 'Atbash Cipher',
      description: 'Reverses the alphabet.',
      details: 'Maps A-Z, B-Y, etc.',
      keyInfo: 'No key needed.',
      drawback: 'Very predictable.'
    },
    vigenere: {
      name: 'Vigenère Cipher',
      description: 'Polyalphabetic substitution using a key.',
      details: 'Each character is encrypted using a letter in the key.',
      keyInfo: 'Use a word key, e.g., "KEY".',
      drawback: 'Vulnerable with short keys.'
    },
    railfence: {
      name: 'Rail Fence Cipher',
      description: 'Zigzag pattern across rails.',
      details: 'Text arranged in rails then read row-wise.',
      keyInfo: 'Use a number > 1, e.g., "3".',
      drawback: 'Simple to reconstruct.'
    },
    affine: {
      name: 'Affine Cipher',
      description: 'Applies (a*x + b) mod 26.',
      details: 'Each character is mathematically transformed.',
      keyInfo: 'Use two numbers: A and B, e.g., "5", "8".',
      drawback: 'Deterministic and crackable.'
    },
    august: {
      name: 'August Cipher',
      description: 'A Vigenère variation.',
      details: 'Modified key usage.',
      keyInfo: 'Use a word key, e.g., "SECRET".',
      drawback: 'Relies on key length.'
    },
    gronsfeld: {
      name: 'Gronsfeld Cipher',
      description: 'Vigenère with numbers.',
      details: 'Each char is shifted by a digit.',
      keyInfo: 'Use numeric string, e.g., "31415".',
      drawback: 'Limited keyspace.'
    },
    beaufort: {
      name: 'Beaufort Cipher',
      description: 'Reversed Vigenère.',
      details: 'Cipher = key - plaintext.',
      keyInfo: 'Use a word, e.g., "ALPHA".',
      drawback: 'Same weaknesses as Vigenère.'
    },
    autoclave: {
      name: 'Autoclave Cipher',
      description: 'Key extends with text.',
      details: 'Dynamic key from text.',
      keyInfo: 'Start with a word, e.g., "START".',
      drawback: 'Known plaintext attack possible.'
    },
    myszkowski: {
      name: 'Myszkowski Cipher',
      description: 'Transposition with repeated key characters.',
      details: 'Read columns based on unique characters in key.',
      keyInfo: 'Use a word like "BALLOON".',
      drawback: 'Patterns can be cracked.'
    },
    hill: {
      name: 'Hill Cipher',
      description: 'Matrix-based encryption.',
      details: '2x2 matrix multiplied with text vector.',
      keyInfo: 'Format: "a,b,c,d", e.g., "3,3,2,5".',
      drawback: 'Matrix must be invertible mod 26.'
    },
    ngram: {
      name: 'N-Gram Viewer',
      description: 'Breaks text into N-letter chunks.',
      details: 'Used in frequency analysis.',
      keyInfo: 'Enter a number N.',
      drawback: 'Not an encryption.'
    },
    route: {
      name: 'Route Cipher',
      description: 'A transposition cipher that writes the message into a grid and then reads it following a predefined route.',
      details: 'Text is arranged in a grid and then read according to a specific route.',
      keyInfo: 'Use a key that defines the route or grid dimensions, e.g., "4" or a route keyword.',
      drawback: 'Can be vulnerable to pattern analysis.'
    }
  };

  useEffect(() => {
    setText('');
    setKey('');
    setKeyA('5');
    setKeyB('8');
  }, [cipher]);

  const getResult = () => {
    if (!text) return '';

    switch (cipher) {
      case 'railfence':
        if (!key || isNaN(key) || Number(key) <= 1) return 'Enter a valid number of rails (greater than 1)';
        return railFenceCipher(text, key, decrypt);

      case 'caesar':
        if (!key) return 'Enter a valid shift key';
        return decrypt ? caesarDecrypt(text, key) : caesarEncrypt(text, key);

      case 'affine':
        if (!keyA || !keyB) return 'Enter valid values for A and B';
        return decrypt ? affineDecrypt(text, keyA, keyB) : affineEncrypt(text, keyA, keyB);

      case 'atbash':
        return atbashCipher(text);

      case 'hill':
        try {
          const matrix = parseHillKey("3,3,2,5");
          return decrypt ? Hill.decrypt(text, matrix) : Hill.encrypt(text, matrix);
        } catch (e) {
          return 'Invalid Hill key. Use format like "3,3,2,5"';
        }

      case 'ngram':
        if (!key || isNaN(key) || Number(key) < 1) return 'Enter a valid number for N';
        return decrypt ? ngramDecrypt(text, Number(key)) : ngramEncrypt(text, Number(key));

      case 'route':  // Added Route cipher case
        if (!key) return 'Enter a valid key';
        return decrypt ? routeDecrypt(text, key) : routeEncrypt(text, key);

      default:
        if (!key && cipher !== 'atbash') return 'Enter a valid key';
        switch (cipher) {
          case 'vigenere': return vigenereCipher(text, key, decrypt);
          case 'august': return decrypt ? augustDecrypt(text, key) : augustEncrypt(text, key);
          case 'gronsfeld': return decrypt ? gronsfeldDecrypt(text, key) : gronsfeldEncrypt(text, key);
          case 'beaufort': return decrypt ? beaufortDecrypt(text, key) : beaufortEncrypt(text, key);
          case 'autoclave': return decrypt ? autoclaveDecrypt(text, key) : autoclaveEncrypt(text, key);
          case 'myszkowski': return decrypt ? myszkowskiDecrypt(text, key) : myszkowskiEncrypt(text, key);
          default: return '';
        }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img src="https://snuchennaiadmissions.com/images/logo.png" alt="Logo" style={{ height: '80px', marginBottom: '10px' }} />
        <h1 style={{ margin: 0 }}>Cryptography CIA</h1>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
        <div style={{ flex: '1 1 40%' }}>
          <h2>Select Cipher</h2>
          {Object.entries(cipherCategories).map(([catKey, category]) => (
            <div key={catKey} style={{ marginBottom: '20px' }}>
              <h3>{category.name}</h3>
              {'types' in category
                ? Object.entries(category.types).map(([typeKey, type]) => (
                    <div key={typeKey}>
                      <h4>{type.name}</h4>
                      {type.ciphers.map(c => (
                        <button
                          key={c}
                          onClick={() => setCipher(c)}
                          style={{
                            margin: '4px',
                            padding: '6px 10px',
                            backgroundColor: cipher === c ? '#2563eb' : '#eee',
                            color: cipher === c ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          {cipherInfo[c].name}
                        </button>
                      ))}
                    </div>
                  ))
                : category.ciphers.map(c => (
                    <button
                      key={c}
                      onClick={() => setCipher(c)}
                      style={{
                        margin: '4px',
                        padding: '6px 10px',
                        backgroundColor: cipher === c ? '#2563eb' : '#eee',
                        color: cipher === c ? 'white' : 'black',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {cipherInfo[c].name}
                    </button>
                  ))}
            </div>
          ))}
        </div>

        <div style={{ flex: '1 1 50%', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', background: 'white' }}>
          <div>
            <h2>{cipherInfo[cipher].name}</h2>
            <p><em>{cipherInfo[cipher].description}</em></p>
            <p><strong>Key Info:</strong> {cipherInfo[cipher].keyInfo}</p>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
              style={{ width: '100%', height: '80px', padding: '10px', marginBottom: '10px' }}
            />

            {cipher !== 'atbash' && cipher !== 'hill' && (
              cipher === 'affine' ? (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="number"
                    placeholder="Key A"
                    value={keyA}
                    onChange={(e) => setKeyA(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                  />
                  <input
                    type="number"
                    placeholder="Key B"
                    value={keyB}
                    onChange={(e) => setKeyB(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Enter key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px'
                  }}
                />
              )
            )}

            <label>
              <input type="checkbox" checked={decrypt} onChange={() => setDecrypt(!decrypt)} />
              {' '}Decrypt
            </label>

            <div style={{ marginTop: '20px', background: '#f5f5f5', padding: '10px', borderRadius: '6px' }}>
              <strong>Result:</strong>
              <pre>{getResult()}</pre>
              <p style={{ color: 'red', fontSize: '12px' }}>
                <strong>Drawback:</strong> {cipherInfo[cipher].drawback}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
