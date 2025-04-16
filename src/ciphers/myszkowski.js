export const myszkowskiEncrypt = (text, key) => {
    const rows = Math.ceil(text.length / key.length);
    let matrix = Array.from({ length: rows }, (_, i) => text.slice(i * key.length, (i + 1) * key.length).padEnd(key.length, 'x'));
    
    const sortedKeyIndices = [...key].map((k, i) => ({ k, i })).sort((a, b) => a.k.localeCompare(b.k)).map(e => e.i);
    
    let result = '';
    for (let i = 0; i < key.length; i++) {
      for (let j = 0; j < rows; j++) {
        result += matrix[j][sortedKeyIndices[i]];
      }
    }
  
    return result;
  };
  
  export const myszkowskiDecrypt = (text, key) => {
    const rows = Math.ceil(text.length / key.length);
    let matrix = Array.from({ length: rows }, (_, i) => []);
    let index = 0;
  
    const sortedKeyIndices = [...key].map((k, i) => ({ k, i })).sort((a, b) => a.k.localeCompare(b.k)).map(e => e.i);
  
    for (let i = 0; i < key.length; i++) {
      for (let j = 0; j < rows; j++) {
        if (index < text.length) matrix[j][sortedKeyIndices[i]] = text[index++];
      }
    }
  
    let result = '';
    for (let i = 0; i < rows; i++) {
      result += matrix[i].join('');
    }
  
    return result.replace(/x+$/, ''); 
  };
  