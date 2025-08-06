export const breakDataToParagraph = (data) => {
  if (!data) return [];

  return data
    .split(".")
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0)
    .map((sentence) => {
      if (/[!?]$/.test(sentence)) {
        sentence = sentence.slice(0, -1);
      }
      return sentence + ".";
    });
};
