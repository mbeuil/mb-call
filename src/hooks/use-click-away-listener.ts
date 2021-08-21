import * as React from 'react';

export const useClickAwayListener = <T extends HTMLElement | SVGElement>(
  clickAwayHandler: () => void,
): React.RefObject<T> => {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const handleClickOutsideRefElement = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        clickAwayHandler();
      }
    };
    document.addEventListener('mousedown', handleClickOutsideRefElement);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideRefElement);
    };
  }, [clickAwayHandler]);

  return ref;
};
