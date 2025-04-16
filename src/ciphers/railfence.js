export function railFenceCipher(text, key, decrypt = false) {
    const numRails = parseInt(key);
    if (decrypt) {
      let railLens = Array(numRails).fill(0);
      let rail = 0, dir = 1;
      for (let i = 0; i < text.length; i++) {
        railLens[rail]++;
        rail += dir;
        if (rail === 0 || rail === numRails - 1) dir *= -1;
      }
      let rails = [], idx = 0;
      for (let len of railLens) {
        rails.push(text.slice(idx, idx + len).split(""));
        idx += len;
      }
      let result = "", currentRail = 0, direction = 1;
      for (let i = 0; i < text.length; i++) {
        result += rails[currentRail].shift();
        currentRail += direction;
        if (currentRail === 0 || currentRail === numRails - 1) direction *= -1;
      }
      return result;
    } else {
      let rails = Array(numRails).fill("").map(() => []);
      let rail = 0, dir = 1;
      for (let char of text) {
        rails[rail].push(char);
        rail += dir;
        if (rail === 0 || rail === numRails - 1) dir *= -1;
      }
      return rails.flat().join('');
    }
  }
  