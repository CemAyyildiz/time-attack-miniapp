import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getUsername, setUsername } from '@/lib/utils/storage';

interface UsernameDialogProps {
  onStart: () => void;
}

export default function UsernameDialog({ onStart }: UsernameDialogProps) {
  const [username, setUsernameInput] = useState('');
  const [hasUsername, setHasUsername] = useState(false);

  useEffect(() => {
    const saved = getUsername();
    if (saved) {
      setUsernameInput(saved);
      setHasUsername(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 2) return;
    
    setUsername(username.trim());
    setHasUsername(true);
    onStart();
  };

  const handleChangeUsername = () => {
    setHasUsername(false);
    setUsernameInput('');
  };

  if (hasUsername) {
    return (
      <div className="text-center space-y-4 p-6 border-4 border-primary pixel-corners bg-card">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          PLAYER
        </p>
        <p className="text-xl font-bold text-primary uppercase tracking-wider">
          {username}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onStart}
            size="lg"
            className="min-w-[150px] text-xs uppercase tracking-widest animate-pulse"
          >
            ▶ START GAME
          </Button>
          <Button
            onClick={handleChangeUsername}
            size="lg"
            variant="outline"
            className="text-xs uppercase tracking-widest"
          >
            CHANGE NAME
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-center space-y-4 p-6 border-4 border-primary pixel-corners bg-card">
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
        ENTER YOUR NAME
      </p>
      <Input
        type="text"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameInput(e.target.value)}
        placeholder="PLAYER NAME"
        maxLength={20}
        className="text-center uppercase tracking-widest pixel-corners border-2"
        autoFocus
      />
      <Button
        type="submit"
        size="lg"
        disabled={username.trim().length < 2}
        className="min-w-[200px] text-xs uppercase tracking-widest"
      >
        ▶ CONTINUE
      </Button>
    </form>
  );
}
