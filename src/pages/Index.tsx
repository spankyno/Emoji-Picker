import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { CategorySection } from '@/components/CategorySection';
import { EmojiCard } from '@/components/EmojiCard';
import { getEmojisByCategory, searchEmojis } from '@/data/emojiData';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const allEmojis = useMemo(() => getEmojisByCategory(), []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchEmojis(searchQuery, allEmojis);
  }, [searchQuery, allEmojis]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gradient-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
            🎨 Emoji Picker
          </h1>
          <p className="text-center text-primary-foreground/90 mb-6">
            Encuentra y copia tus emojis favoritos con facilidad
          </p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {searchResults ? (
          // Search Results
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Resultados de búsqueda
              </h2>
              <span className="text-muted-foreground">
                {searchResults.length} {searchResults.length === 1 ? 'emoji encontrado' : 'emojis encontrados'}
              </span>
            </div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((emoji, index) => (
                  <EmojiCard
                    key={`${emoji.emoji}-${index}`}
                    emoji={emoji}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No se encontraron emojis que coincidan con "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        ) : (
          // All Categories
          <div className="space-y-12">
            {Object.entries(allEmojis).map(([category, emojis]) => (
              <CategorySection
                key={category}
                category={category}
                emojis={emojis}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Emoji Picker - Todos los emojis con su información Unicode</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
