import * as React from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { useCall } from '@/hooks';
import { AsyncStatus, Note } from '@/types';
import { findCallInArray, formatTime, getCallColor } from '@/utils';
import { useI18n } from 'next-localization';
import { CallDirection } from '@/icons';
import CallTypeDocumentation from '@/components/call-type-documentation';

function NoteEntry({ content }: Note): JSX.Element {
  return <p className="p-5 rounded-sm bg-opGreen text-primary">{content}</p>;
}

interface NoteScreenProps {
  notes: Note[] | undefined;
}

function NoteScreen({ notes = [] }: NoteScreenProps): JSX.Element {
  const i18n = useI18n();
  const [input, setInput] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInput(e.target.value);

  return (
    <div className="flex flex-col w-full max-w-md p-5 border rounded-sm border-primary min-h-[466px]">
      <ul className="flex flex-col h-full gap-5 mb-5">
        {notes.map((note) => (
          <NoteEntry key={note.id} {...note} />
        ))}
      </ul>
      <input
        aria-label={i18n.t('call_page.note_input')}
        title={i18n.t('call_page.note_input')}
        className="h-8 px-5 mt-auto bg-transparent border rounded-sm border-green"
        placeholder="note"
        value={input}
        onChange={handleChange}
      />
    </div>
  );
}

function CallDisplay(): JSX.Element {
  const { callStatus, callList, call, fetchCall, setCall } = useCall();
  const router = useRouter();
  const i18n = useI18n();
  const [session] = useSession();

  const cid = router.query.cid;

  React.useEffect(() => {
    if (callList.length > 0 && typeof cid === 'string') {
      const foundItem = findCallInArray({ callList, cid });

      setCall({ call: foundItem });
    }
    if (callList.length === 0 && typeof cid === 'string') {
      fetchCall({ id: cid as string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callList, session]);

  return (
    <div className="flex flex-col items-center w-full m-5">
      {(callStatus === AsyncStatus.IDLE ||
        callStatus === AsyncStatus.PENDING) && (
        <p className="p-5 text-secondary">{i18n.t('call_page.loading')}</p>
      )}
      {callStatus === AsyncStatus.REJECTED && (
        <p className="p-5 text-red-400">{i18n.t('call_page.error')}</p>
      )}
      {callStatus === AsyncStatus.RESOLVED && (
        <>
          <h1 className="mb-8 text-3xl text-primary sm:text-5xl">
            {i18n.t('call_page.title')}
          </h1>
          <div className="flex flex-col items-center justify-center w-full gap-5 sm:flex-row">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row gap-5 mb-auto sm:flex-col">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col p-5 border rounded-sm w-52 border-primary">
                    <div className="flex w-full">
                      <p className="mr-1 text-secondary">via</p>
                      <p className="ml-auto font-mono text-green">
                        {call?.via}
                      </p>
                    </div>
                    <div className="w-full my-3 border-b border-dashed border-primary" />
                    <div className="flex w-full">
                      <p className="mr-1 text-secondary">
                        {i18n.t('call_page.from')}
                      </p>
                      <p className="ml-auto font-mono text-primary">
                        {call?.from}
                      </p>
                    </div>
                    <div className="flex w-full">
                      <p className="mr-1 text-secondary">
                        {i18n.t('call_page.to')}
                      </p>
                      <p className="ml-auto font-mono text-primary">
                        {call?.to}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row p-5 border rounded-sm w-52 border-primary">
                    <p className="mr-auto text-secondary">
                      {i18n.t('call_page.duration')}
                    </p>
                    <p className="font-mono text-primary">
                      {formatTime(call?.duration)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col w-full p-5 border rounded-sm border-primary">
                  <div className="w-5 h-5 m-auto">
                    <CallDirection
                      direction={call?.direction}
                      className={
                        'w-5 h-5 text-secondary' + getCallColor(call?.call_type)
                      }
                    />
                  </div>
                  <div className="w-full my-3 border-b border-dashed border-primary" />
                  <CallTypeDocumentation className="m-auto" />
                </div>
              </div>
              {call?.is_archived && (
                <div className="flex w-full p-5 border rounded-sm border-primary">
                  <p className="m-auto font-mono text-primary">
                    {i18n.t('call_page.archive')}
                  </p>
                </div>
              )}
            </div>
            <NoteScreen notes={call?.notes} />
          </div>
        </>
      )}
    </div>
  );
}

export default CallDisplay;
