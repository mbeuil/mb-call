import { Theme } from '@/types';
import { Moon } from './moon';
import { Sun } from './sun';

interface SocialsProps {
  theme: Theme;
  className?: string;
}

export function Weather({ theme, className }: SocialsProps): JSX.Element {
  switch (theme) {
    case Theme.DARK:
      return <Moon className={className} />;
    case Theme.LIGHT:
      return <Sun className={className} />;
  }
}
