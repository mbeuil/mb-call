import { useI18n } from 'next-localization';

function Footer(): JSX.Element {
  const i18n = useI18n();

  return (
    <footer className="flex items-center justify-center w-full h-12 max-w-6xl gap-1 px-5">
      <p className="text-secondary">{i18n.t('footer.by')}</p>
      <a
        className="text-green hover:text-altGreen"
        aria-label={i18n.t('footer.link_github')}
        title={i18n.t('footer.link_github')}
        href="https://github.com/mbeuil"
        target="_blank"
        rel="noopener noreferrer">
        Maxime Beuil
      </a>
    </footer>
  );
}

export default Footer;
