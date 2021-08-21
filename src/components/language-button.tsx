import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';

import Anchor from '@/components/anchor';
import { useClickAwayListener } from '@/hooks';
import { Chevron } from '@/icons';
import { Language } from '@/types';

function LanguageButton(): JSX.Element {
  const { locale, asPath: path } = useRouter();
  const i18n = useI18n();
  const [visible, setVisible] = React.useState(false);
  const languageButtonRef = useClickAwayListener<HTMLDivElement>(() =>
    setVisible(false),
  );

  const handleClick = (): void => setVisible(!visible);

  const selectedLanguage = locale === Language.FR ? Language.FR : Language.EN;
  const otherLanguage = locale === Language.FR ? Language.EN : Language.FR;
  const to = locale === Language.FR ? path : `/fr${path}`;

  return (
    <div ref={languageButtonRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={visible}
        aria-label={i18n.t('nav.language_selected')}
        title={i18n.t('nav.language_selected')}
        className="relative flex flex-row items-center h-10 gap-3 px-4 border rounded border-primary text-primary"
        onClick={handleClick}>
        {selectedLanguage.toUpperCase()}
        <Chevron
          className={`w-2 h-2 text-secondary transition transform duration-200 ${
            visible ? 'rotate-180' : ''
          }`}
        />
      </button>
      {visible && (
        <ul
          role="listbox"
          aria-label={i18n.t('nav.language_list')}
          className="absolute right-0 w-32 py-2 border rounded top-12 border-primary">
          <li aria-selected role="option">
            <NextLink href={to} locale={otherLanguage} scroll passHref>
              <Anchor
                aria-label={i18n.t('nav.language_goto')}
                title={i18n.t('nav.language_goto')}
                className="flex items-center w-full h-8 gap-3 px-4 text-lg hover:bg-opGreen text-primary">
                {locale === Language.FR ? 'English' : 'Français'}
              </Anchor>
            </NextLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default LanguageButton;
