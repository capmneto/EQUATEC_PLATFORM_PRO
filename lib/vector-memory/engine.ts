const stopWords = new Set([
  "a", "o", "os", "as", "de", "do", "da", "dos", "das", "e", "em", "para",
  "por", "com", "um", "uma", "no", "na", "nos", "nas", "ao", "aos", "que",
  "se", "ou", "como", "mais", "menos", "ser", "sao", "são"
]);

export function tokenizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

export function calculateSemanticScore(queryTokens: string[], contentTokens: string[]) {
  if (queryTokens.length === 0 || contentTokens.length === 0) {
    return 0;
  }

  const contentSet = new Set(contentTokens);
  const matches = queryTokens.filter((token) => contentSet.has(token)).length;

  return matches / Math.sqrt(queryTokens.length * contentSet.size);
}
