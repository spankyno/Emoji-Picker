import emojiData from 'emojibase-data/en/data.json';

export interface EmojiInfo {
  emoji: string;
  name: string;
  group: string;
  codePoint: string;
  unicode: string;
  hexcode: string;
}

// Map of group numbers to category names
const groupCategories: Record<number, string> = {
  0: '😊 Smileys & Emotion',
  1: '👤 People & Body',
  2: '🦁 Animals & Nature',
  3: '🍕 Food & Drink',
  4: '✈️ Travel & Places',
  5: '⚽ Activities',
  6: '💡 Objects',
  7: '❤️ Symbols',
  8: '🚩 Flags',
};

function getCodePointsFromEmoji(emoji: string): string {
  const codePoints = [];
  for (const char of emoji) {
    const codePoint = char.codePointAt(0);
    if (codePoint) {
      codePoints.push(`U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`);
    }
  }
  return codePoints.join(' ');
}

function getUnicodeEscape(emoji: string): string {
  const escapes = [];
  for (const char of emoji) {
    const codePoint = char.codePointAt(0);
    if (codePoint) {
      escapes.push(`\\u{${codePoint.toString(16).toUpperCase()}}`);
    }
  }
  return escapes.join('');
}

export function getEmojisByCategory(): Record<string, EmojiInfo[]> {
  const categorizedEmojis: Record<string, EmojiInfo[]> = {};

  emojiData.forEach((emoji: any) => {
    const group = emoji.group ?? 7; // Default to Symbols if no group
    const categoryName = groupCategories[group] || '❓ Other';
    
    if (!categorizedEmojis[categoryName]) {
      categorizedEmojis[categoryName] = [];
    }

    // Use hexcode from data or calculate from emoji
    const hexcode = emoji.hexcode || emoji.emoji;
    const codePoint = getCodePointsFromEmoji(emoji.emoji);
    const unicode = getUnicodeEscape(emoji.emoji);

    categorizedEmojis[categoryName].push({
      emoji: emoji.emoji,
      name: emoji.label || emoji.annotation || 'Unknown',
      group: categoryName,
      codePoint,
      unicode,
      hexcode,
    });
  });

  return categorizedEmojis;
}

export function searchEmojis(query: string, allEmojis: Record<string, EmojiInfo[]>): EmojiInfo[] {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  const results: EmojiInfo[] = [];

  Object.values(allEmojis).forEach(categoryEmojis => {
    categoryEmojis.forEach(emoji => {
      if (
        emoji.name.toLowerCase().includes(lowerQuery) ||
        emoji.emoji.includes(query) ||
        emoji.hexcode?.toLowerCase().includes(lowerQuery)
      ) {
        results.push(emoji);
      }
    });
  });

  return results;
}
