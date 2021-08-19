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

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1 className="text-3xl sm:text-5xl text-gray-900">
        {i18n.t('home.greetings')}
      </h1>
    </div>
  );
};

export default Home;
