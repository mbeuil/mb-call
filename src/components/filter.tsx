import { useI18n } from 'next-localization';

import { useCall } from '@/hooks';
import { StateOptions } from '@/types';

/* eslint-disable jsx-a11y/no-onchange */
function Filter(): JSX.Element {
  const i18n = useI18n();
  const { setStateFilter } = useCall();

  const stateOptions = [
    {
      label: i18n.t('filter.disable'),
      value: StateOptions.DISABLE,
    },
    {
      label: i18n.t('filter.archive'),
      value: StateOptions.ARCHIVE,
    },
    {
      label: i18n.t('filter.not_archive'),
      value: StateOptions.NOT_ARCHIVE,
    },
  ];

  function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setStateFilter({ option: e.target.value as StateOptions });
  }

  return (
    <div className="flex w-full max-w-md my-2 text-sm">
      <p className="self-center text-secondary">{i18n.t('filter.text')}</p>
      <div className="ml-auto">
        <label className="mx-1 text-secondary" htmlFor="archived-select">
          {i18n.t('filter.state')}
        </label>
        <select
          id="archived-select"
          className="px-2 py-1 bg-transparent border rounded-sm text-secondary w-28 border-primary sm:"
          onChange={handleStateChange}>
          {stateOptions.map((option) => (
            <option
              className="text-secondary"
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
