import * as React from 'react';
import { getSession, signIn } from 'next-auth/client';
import { useI18n } from 'next-localization';
import { Session } from 'next-auth';
import type { GetServerSideProps } from 'next';

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

function SignIn(): JSX.Element {
  const i18n = useI18n();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn('credentials', {
      username,
      password,
      callbackUrl: 'http://localhost:3000/',
    });
  }

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setUsername(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setPassword(e.target.value);

  const isSubmitDisable = !username.length || !password.length;

  const meta = {
    description: i18n.t('login.meta_description'),
  };

  return (
    <Container customMeta={meta}>
      <h1 className="mb-10 text-5xl font-medium text-primary">
        {i18n.t('login.title')}
      </h1>
      <p className="mb-3 text-secondary">{i18n.t('login.text')}</p>
      <form method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col w-64 mb-3 border rounded-md border-primary">
          <label htmlFor="usernameInput" className="sr-only">
            Username
          </label>
          <input
            className="h-12 px-5 text-sm bg-transparent text-primary"
            id="usernameInput"
            name="username"
            type="text"
            placeholder={i18n.t('login.placeholder_username')}
            value={username}
            onChange={handleUsername}
          />
          <div className="w-full border-b border-dashed border-primary" />
          <label htmlFor="passwordeInput" className="sr-only">
            Password
          </label>
          <input
            className="h-12 px-5 text-sm bg-transparent text-primary"
            id="passwordeInput"
            name="password"
            type="password"
            placeholder={i18n.t('login.placeholder_password')}
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button
          className={`rounded bg-green px-[19px] py-[14px] hover:bg-altGreen w-64 ${
            isSubmitDisable && 'cursor-default'
          }`}
          disabled={isSubmitDisable}
          type="submit">
          {i18n.t('login.submit')}
        </button>
      </form>
    </Container>
  );
}

export default SignIn;
