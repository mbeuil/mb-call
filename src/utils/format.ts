export const formatDate = (locale: string, date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatTime = (seconds?: number): string => {
  const date = new Date((seconds || 0) * 1000);
  const timeString = date.toTimeString().split(' ')[0];

  return timeString;
};
