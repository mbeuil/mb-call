import { useI18n } from 'next-localization';
import { signIn, signOut, useSession } from 'next-auth/client';

import { useWidth } from '@/hooks';
import { LockBox, UnlockBox } from '@/icons';

const BREAK_POINT = 640;

function SignInOut(): JSX.Element {
  const i18n = useI18n();
  const [session] = useSession();
  const { width } = useWidth();

  return (
    <>
      {!session && (
        <button
          type="button"
          className="h-10 px-4 text-sm border rounded-sm border-green text-green hover:border-altGreen hover:text-altGreen"
          onClick={() => signIn()}>
          {width >= BREAK_POINT && i18n.t('nav.sign_in')}
          {width < BREAK_POINT && <UnlockBox className="w-5 h-5" />}
        </button>
      )}
      {session && (
        <button
          type="button"
          className="h-10 px-4 text-sm text-red-400 border border-red-400 rounded-sm hover:border-red-500 hover:text-red-500"
          onClick={() => signOut()}>
          {width >= BREAK_POINT && i18n.t('nav.sign_out')}
          {width < BREAK_POINT && <LockBox className="w-5 h-5" />}
        </button>
      )}
    </>
  );
}

export default SignInOut;
