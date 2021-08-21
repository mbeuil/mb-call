import * as React from 'react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/router';

import Anchor from '@/components/anchor';
import LanguageButton from '@/components/language-button';
import { Logo } from '@/icons';
import SignInOut from './sign-in-out';

const ThemeButton = dynamic(() => import('@/components/theme-button'), {
  ssr: false,
});

function NavBar(): JSX.Element {
  const i18n = useI18n();
  const router = useRouter();

  return (
    <nav className="flex flex-row items-center w-full h-12 max-w-6xl gap-2 px-5">
      <NextLink href="/" passHref>
        <Anchor
          aria-label={i18n.t('nav.logo')}
          title={i18n.t('nav.logo')}
          className="mr-auto text-primary hover:text-primaryHover">
          <Logo className="h-10 text-primary w-28" />
        </Anchor>
      </NextLink>
      {router.pathname !== '/signin' && <SignInOut />}
      <ThemeButton />
      <LanguageButton />
    </nav>
  );
}

export default NavBar;
