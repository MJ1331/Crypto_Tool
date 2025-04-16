export const routeEncrypt = (text, columns) => {
    const rows = Math.ceil(text.length / columns);
    let matrix = Array.from({ length: rows }, (_, i) => text.slice(i * columns, (i + 1) * columns).padEnd(columns, 'x'));
    
    let result = '';
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        result += matrix[j][i];
      }
    }
    
    return result;
  };
  
  export const routeDecrypt = (text, columns) => {
    const rows = Math.ceil(text.length / columns);
    let matrix = Array.from({ length: rows }, () => []);
    let index = 0;
    
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (index < text.length) matrix[j].push(text[index++]);
      }
    }
    
    let result = '';
    for (let i = 0; i < rows; i++) {
      result += matrix[i].join('');
    }
  
    return result.replace(/x+$/, ''); // Remove padding
  };
  