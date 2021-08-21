import Head from 'next/head';
import { useRouter } from 'next/router';
import { useI18n } from 'next-localization';

import { Language, Meta } from '@/types';
import { APP_BASE_URL } from '@/utils';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

interface ContainerProps {
  children: React.ReactNode;
  customMeta?: Meta;
}

function Container({ children, customMeta }: ContainerProps): JSX.Element {
  const router = useRouter();
  const i18n = useI18n();

  const meta = {
    title: i18n.t('meta.title'),
    description: i18n.t('meta.description'),
    type: 'website',
    ...customMeta,
  };

  const language = router.locale;
  const path = language === Language.EN ? router.asPath : `/fr${router.asPath}`;

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content={meta.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="canonical" href={`${APP_BASE_URL}${path}`} />
        {/* Localized html tags */}
        <link
          rel="alternate"
          href={`${APP_BASE_URL}${router.asPath}`}
          hrefLang={Language.EN}
        />
        <link
          rel="alternate"
          href={`${APP_BASE_URL}/fr${router.asPath}`}
          hrefLang={Language.FR}
        />
        <link
          rel="alternate"
          href={`${APP_BASE_URL}${router.asPath}`}
          hrefLang="x-default"
        />
      </Head>
      <a href="#skip" className="sr-only">
        {i18n.t('a11y.skip_to_content')}
      </a>
      <NavBar />
      <main
        id="skip"
        className="flex flex-col items-center justify-center w-full max-w-6xl px-5 min-h-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Container;
