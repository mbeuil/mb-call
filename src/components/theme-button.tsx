import * as React from 'react';
import { useI18n } from 'next-localization';

import { Weather } from '@/icons';
import { Theme } from '@/types';

function ThemeButton(): JSX.Element {
  const i18n = useI18n();
  const [theme, setTheme] = React.useState(() => {
    return document.body.classList.item(0) as string;
  });

  React.useEffect(() => {
    if (theme === Theme.DARK) {
      document.body.classList.replace(Theme.LIGHT, Theme.DARK);
    } else {
      document.body.classList.replace(Theme.DARK, Theme.LIGHT);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isDark = theme === Theme.DARK;
  const handleClick = (): void => setTheme(isDark ? Theme.LIGHT : Theme.DARK);

  return (
    <button
      type="button"
      aria-label={i18n.t(
        theme === Theme.DARK ? 'nav.theme_dark' : 'nav.theme_light',
      )}
      title={i18n.t(
        theme === Theme.DARK ? 'nav.theme_dark' : 'nav.theme_light',
      )}
      className="relative inline-block w-10 h-10 overflow-hidden leading-10 border rounded border-primary"
      onClick={handleClick}>
      <Weather
        theme={Theme.DARK}
        className={`text-primary h-6 w-6 mx-[7px] mt-[7px] relative block transition transform duration-300 ${
          isDark ? '-translate-y-10' : ''
        }`}
      />
      <Weather
        theme={Theme.LIGHT}
        className={`text-primary h-6 w-6 mx-[7px] mt-4  relative block transition transform duration-300 ${
          isDark ? '-translate-y-10' : ''
        }`}
      />
    </button>
  );
}

export default ThemeButton;
