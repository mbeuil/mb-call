import * as React from 'react';
import { getSession, signIn, useSession } from 'next-auth/client';
import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';

import Container from '@/components/container';
import CallDisplay from '@/modules/call-dispplay';

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

  return (
    <Container>
      {!session && <p className="text-primary">Loading ...</p>}
      {session && <CallDisplay />}
    </Container>
  );
}

export default CID;
