// Prevents 1–2 letter prepositions/conjunctions from hanging at line ends
// by replacing the trailing space with a non-breaking space.
export function nbsp(text: string): string {
  return text.replace(
    /(^|[\s(«"])([A-Za-zА-Яа-яЁё]{1,2})\s+(?=[A-Za-zА-Яа-яЁё0-9])/g,
    (_, prefix: string, word: string) => `${prefix}${word} `,
  );
}
