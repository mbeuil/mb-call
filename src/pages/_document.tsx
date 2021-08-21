import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    const setInitialTheme = `
    function getThemePreference() {
      if(window.localStorage.getItem('theme')) {
        return window.localStorage.getItem('theme')
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
    }
    document.body.classList.add(getThemePreference());
  `;

    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#0d1219" />
          <meta name="color-scheme" content="dark light" />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
