import { EmojiInfo } from '@/data/emojiData';
import { EmojiCard } from './EmojiCard';

interface CategorySectionProps {
  category: string;
  emojis: EmojiInfo[];
}

export function CategorySection({ category, emojis }: CategorySectionProps) {
  return (
    <section className="space-y-4 animate-slide-up">
      <h2 className="text-2xl font-bold text-foreground sticky top-0 bg-background/95 backdrop-blur py-3 z-10 border-b">
        {category}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {emojis.map((emoji, index) => (
          <EmojiCard
            key={`${emoji.emoji}-${index}`}
            emoji={emoji}
          />
        ))}
      </div>
    </section>
  );
}
