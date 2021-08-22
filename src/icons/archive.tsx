import { IconProps } from '@/types';

export function Archive({ className }: IconProps): JSX.Element {
  return (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="boxAltIconTitle"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      color="currentColor"
      className={className}>
      <rect x="5" y="9" width="14" height="11" />{' '}
      <rect width="16" height="4" transform="matrix(1 0 0 -1 4 9)" />{' '}
      <rect x="9" y="12" width="6" height="3" />{' '}
    </svg>
  );
}
