import * as React from 'react';
import { getSession, signIn, useSession } from 'next-auth/client';
import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';

import Container from '@/components/container';
import CallDisplay from '@/modules/call-dispplay';
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

function CID(): JSX.Element {
  const [session, loading] = useSession();

  React.useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError' || (loading && !session)) {
      signIn();
    }
  }, [loading, session]);

  // Keep the Client session active for coding purpose
  // React.useEffect(() => {
  //   const sessionTimer = setInterval(() => {
  //     getSession();
  //   }, EXPIRED_TIME_LIMIT + 1000);
  //   return () => clearTimeout(sessionTimer);
  // }, []);

  return (
    <Container>
      {!session && <p className="text-primary">Loading ...</p>}
      {session && <CallDisplay />}
    </Container>
  );
}

export default CID;
