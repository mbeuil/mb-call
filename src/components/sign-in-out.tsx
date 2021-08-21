import { signIn, signOut, useSession } from 'next-auth/client';
import { useI18n } from 'next-localization';

function SignInOut(): JSX.Element {
  const i18n = useI18n();
  const [session] = useSession();

  return (
    <>
      {!session && (
        <button
          type="button"
          className="h-10 px-4 text-sm border rounded-sm border-green text-green hover:border-altGreen hover:text-altGreen"
          onClick={() => signIn()}>
          {i18n.t('nav.sign_in')}
        </button>
      )}
      {session && (
        <button
          type="button"
          className="h-10 px-4 text-sm border rounded-sm border-green text-green hover:border-altGreen hover:text-altGreen"
          onClick={() => signOut()}>
          {i18n.t('nav.sign_out')}
        </button>
      )}
    </>
  );
}

export default SignInOut;
