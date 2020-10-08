export const initCap = (text) => {
  if (!text) {
    return null;
  }
  return text.trim().toLowerCase().replace(/(?:^)[a-z]/g, (char) => {
    return char.toUpperCase();
  })
}