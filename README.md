# Crypto Tool

This repository contains a **React-based interactive application** that implements a collection of classical cryptographic algorithms using JavaScript. Designed for **educational purpose** and for my CIA in Cryptography Concepts, the tool allows users to experiment with encryption and decryption using a user-friendly web interface.

🔗 **Live Demo:** [Crypto Cipher Tool Website](https://crypto-tool-project.vercel.app/)

---

## Substitution Ciphers

Substitution ciphers replace elements of the plaintext with corresponding elements of ciphertext based on a rule or key.

### Single Substitution  
➡ Each letter is consistently replaced with another based on a fixed rule.

-  **Caesar Cipher**: Shifts letters by a fixed amount.
-  **Atbash Cipher**: Reverses the alphabet (A ↔ Z, B ↔ Y).
-  **Affine Cipher**: Uses a function `E(x) = (ax + b) mod 26`.
-  **August Cipher**: A Caesar-like variation with a word-based key.

###  Multiple Substitution  
➡ These ciphers use multiple alphabets or dynamic keys to enhance security.

####  Polyalphabetical
-  **Vigenère Cipher**: Uses a repeated key for shifting characters.
-  **Gronsfeld Cipher**: Uses numeric keys (e.g., "31415") for character shifting.
-  **Beaufort Cipher**: Similar to Vigenère but subtracts the key from plaintext.
-  **Autoclave Cipher**: Extends the key using the plaintext itself.
-  **Hill Cipher**: Uses matrix multiplication to encrypt blocks of text.

---

## Transposition Ciphers

These rearrange the characters in the plaintext to form ciphertext.

-  **Rail Fence Cipher**: Writes characters in a zigzag pattern across "rails".
-  **Myszkowski Cipher**: Uses a keyword with repeating characters for column order.
-  **Route Cipher**: Writes text in a grid and reads it in a special route (spiral, zigzag).

---

## Cryptanalysis Tool

-  **N-Gram Analyzer**: Breaks input into N-letter chunks to help identify patterns for frequency analysis and attacks on substitution ciphers.

---

## Application Overview

The UI is developed using **React.js** and styled for usability and clarity. Each cipher is modularized and implemented with JavaScript logic, enabling independent development, testing, and usage.

### Features

-  Clean and intuitive interface
-  Real-time encryption/decryption
-  Cipher descriptions and key instructions
-  Sample input/output viewing
-  All code is human-readable and well-commented

---

## Project Structure

<details>
<summary>📁 src</summary>
src/ ├── App.js
├── App.css
├── ciphers/
│ ├── Caesar.js
│ ├── Atbash.js
│ ├── Affine.js
│ ├── Vigenere.js
│ ├── Gronsfeld.js
│ ├── Beaufort.js
│ ├── August.js
│ ├── Autoclave.js
│ ├── Hill.js
│ ├── Route.js
│ ├── Myszkowski.js
│ └── Ngram.js

</details>

<details>
<summary>📁 output</summary>

output/ └── caesar_encry.png
└── caesar_decry.png
└── atbash_encry.png
.
.

</details>

---

## 🚀 Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 1. Clone the repository
git clone https://github.com/MJ1331/Crypto_Tool.git
cd Crypto_Tool

### 2. Install dependencies
npm install

### 3. Start the development server
npm start


Mohamed Junaidh R
22011102056
IoT A
