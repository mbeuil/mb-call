import { useI18n } from 'next-localization';

interface CallTypeDocumentationProps {
  className?: string;
}

function CallTypeDocumentation({
  className,
}: CallTypeDocumentationProps): JSX.Element {
  const i18n = useI18n();

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center">
        <div className="w-2 h-2 mr-1 bg-red-400 rounded-full" />
        <p className="text-xs text-secondary">{i18n.t('call_type.missed')}</p>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 mr-1 rounded-full bg-green" />
        <p className="text-xs text-secondary">{i18n.t('call_type.answered')}</p>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 mr-1 rounded-full bg-secondary" />
        <p className="text-xs text-secondary">
          {i18n.t('call_type.voicemail')}
        </p>
      </div>
    </div>
  );
}

export default CallTypeDocumentation;
