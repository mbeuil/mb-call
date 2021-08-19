import type { GetStaticProps, NextPage } from 'next';

import { useI18n } from 'next-localization';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { default: lngDict = {} } = await import(`../locales/${locale}.json`);

  return {
    props: { lngDict },
  };
};

const Home: NextPage = () => {
  const i18n = useI18n();

  return <div>{i18n.t('home.greetings')}</div>;
};

export default Home;
