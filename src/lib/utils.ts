export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
  
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = randomValues[i] % charactersLength;
      result += characters.charAt(randomIndex);
    }
  
    return result;
  };