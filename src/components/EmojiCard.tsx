import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { EmojiInfo } from '@/data/emojiData';

interface EmojiCardProps {
  emoji: EmojiInfo;
}

type CopyType = 'emoji' | 'codepoint' | 'unicode' | null;

export function EmojiCard({ emoji }: EmojiCardProps) {
  const [copiedType, setCopiedType] = useState<CopyType>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: CopyType, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      toast({
        title: `${label} copiado`,
        description: text,
        duration: 2000,
      });
      setTimeout(() => setCopiedType(null), 2000);
    });
  };

  return (
    <Card className="p-4 bg-gradient-card shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
      <div className="flex flex-col items-center space-y-3">
        {/* Emoji Display */}
        <div className="text-6xl select-none">{emoji.emoji}</div>

        {/* Emoji Name */}
        <h3 className="text-sm font-medium text-foreground text-center line-clamp-2 min-h-[2.5rem]">
          {emoji.name}
        </h3>

        {/* Info Section */}
        <div className="w-full space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Codepoint:</span>
            <code className="bg-secondary px-2 py-1 rounded text-secondary-foreground font-mono">
              {emoji.codePoint}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Unicode:</span>
            <code className="bg-secondary px-2 py-1 rounded text-secondary-foreground font-mono truncate max-w-[120px]">
              {emoji.unicode}
            </code>
          </div>
        </div>

        {/* Copy Buttons */}
        <div className="flex flex-col w-full gap-2">
          <Button
            size="sm"
            variant="default"
            className="w-full"
            onClick={() => copyToClipboard(emoji.emoji, 'emoji', 'Emoji')}
          >
            {copiedType === 'emoji' ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar Emoji
              </>
            )}
          </Button>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              onClick={() => copyToClipboard(emoji.codePoint, 'codepoint', 'Codepoint')}
            >
              {copiedType === 'codepoint' ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              onClick={() => copyToClipboard(emoji.unicode, 'unicode', 'Unicode')}
            >
              {copiedType === 'unicode' ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
