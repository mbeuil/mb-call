import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { useCall } from '@/hooks';
import { Archive, CallDirection } from '@/icons';
import { AsyncStatus, Call, Language } from '@/types';
import { formatDate, getCallColor } from '@/utils';
import CallTypeDocumentation from '@/components/call-type-documentation';
import { useI18n } from 'next-localization';
import Filter from '@/components/filter';

function CallListRow(props: Call): JSX.Element {
  const { id, direction, via, created_at, call_type, is_archived } = props;
  const { locale } = useRouter();

  const date = formatDate(
    locale === Language.EN ? 'en-US' : 'fr-FR',
    new Date(created_at),
  );

  return (
    <NextLink href={`/${id}`}>
      <li className="relative grid items-center my-1 grid-cols-dashboard h-7 hover:bg-opGreen hover:cursor-pointer">
        <div className="w-4 h-4 ml-5 sm:w-5 sm:h-5">
          <CallDirection
            direction={direction}
            className={
              'w-4 h-4 sm:w-5 sm:h-5 text-secondary' + getCallColor(call_type)
            }
          />
        </div>
        <p className="w-full font-mono text-center text-primary">{via}</p>
        <p className="mr-5 font-mono text-secondary">{date}</p>
        {is_archived && (
          <div className="absolute left-10 sm:left-16">
            <Archive className="w-4 h-4 sm:w-6 sm:h-6 text-secondary" />
          </div>
        )}
      </li>
    </NextLink>
  );
}

function Dashboard(): JSX.Element {
  const [session] = useSession();
  const i18n = useI18n();
  const { callListStatus, callList, filteredCallList, fetchCalls } = useCall();

  React.useEffect(() => {
    if (session && session.accessToken && !callList.length) {
      fetchCalls();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="flex flex-col items-center w-full m-5">
      <h1 className="mb-8 text-3xl text-primary sm:text-5xl">Dashboard</h1>
      <h2 className="w-full max-w-md mb-2 text-primary">
        {i18n.t('dashboard.h2')}
      </h2>
      <Filter />
      <ul className="w-full max-w-md border rounded-sm border-primary sm:max-h-[650px] max-h-[400px] overflow-scroll">
        {(callListStatus === AsyncStatus.IDLE ||
          callListStatus === AsyncStatus.PENDING) && (
          <p className="p-5 text-secondary">{i18n.t('dashboard.loading')}</p>
        )}
        {callListStatus === AsyncStatus.REJECTED && (
          <p className="p-5 text-red-400">{i18n.t('dashboard.error')}</p>
        )}
        {callListStatus === AsyncStatus.RESOLVED && (
          <>
            {!filteredCallList.length && (
              <p className="p-5 text-secondary">
                {i18n.t('dashboard.empty_search')}
              </p>
            )}
            {filteredCallList.map((call: Call) => (
              <CallListRow key={call.id} {...call} />
            ))}
          </>
        )}
      </ul>
      <CallTypeDocumentation className="w-full max-w-md pt-1" />
    </div>
  );
}

export default Dashboard;
