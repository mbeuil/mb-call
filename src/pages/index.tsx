import * as React from 'react';
import { signIn, useSession, getSession } from 'next-auth/client';
import { useI18n } from 'next-localization';
import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';

import Container from '@/components/container';

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async ({ locale, ...context }) => {
  const { default: lngDict = {} } = await import(`../locales/${locale}.json`);

  return {
    props: {
      lngDict,
      session: await getSession(context),
    },
  };
};

function Home(): JSX.Element {
  const i18n = useI18n();
  const [session] = useSession();

  React.useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn();
    }
  }, [session]);

  return (
    <Container>
      {!session && <p>{i18n.t('home.no_user_text')}</p>}
      {session && (
        <h1 className="text-3xl text-gray-900 sm:text-5xl">Hello World</h1>
      )}
    </Container>
  );
}

export default Home;
