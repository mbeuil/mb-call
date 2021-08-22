import * as React from 'react';

const getWidth = (): number =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

export const useWidth = (): { width: number } => {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resizeListener = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };

    setWidth(getWidth());

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return { width };
};
