import { IconProps } from '@/types';

export function Chevron({ className }: IconProps): JSX.Element {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 10 10"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeMiterlimit="1.5"
      className={className}>
      <path
        d="M0.495,2.506L5.009,7.038L9.529,2.511"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25px"
      />
    </svg>
  );
}
