import * as React from 'react';
import { signIn, useSession, getSession } from 'next-auth/client';
import { useI18n } from 'next-localization';
import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';

import Container from '@/components/container';
import Dashboard from '@/modules/dashboard';
// import { EXPIRED_TIME_LIMIT } from '@/utils';

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

  // Keep the Client session active for coding purpose
  // React.useEffect(() => {
  //   const sessionTimer = setInterval(() => {
  //     getSession();
  //   }, EXPIRED_TIME_LIMIT + 1000);
  //   return () => clearTimeout(sessionTimer);
  // }, []);

  return (
    <Container>
      {!session && (
        <p className="text-primary">{i18n.t('home.no_user_text')}</p>
      )}
      {session && <Dashboard />}
    </Container>
  );
}

export default Home;
