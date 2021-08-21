import '@/styles/index.css';

import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { lngDict, ...rest } = pageProps;
  const router = useRouter();

  return (
    <I18nProvider lngDict={lngDict} locale={router?.locale as string}>
      <Provider session={pageProps.session}>
        <Component {...rest} />
      </Provider>
    </I18nProvider>
  );
}

export default MyApp;
