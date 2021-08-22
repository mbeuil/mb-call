import { IconProps } from '@/types';

export function LockBox({ className }: IconProps): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path d="M12,2C9.243,2,7,4.243,7,7v3H6c-1.103,0-2,0.897-2,2v8c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2v-8c0-1.103-0.897-2-2-2 h-1V7C17,4.243,14.757,2,12,2z M18,12l0.002,8H6v-8H18z M9,10V7c0-1.654,1.346-3,3-3s3,1.346,3,3v3H9z" />
    </svg>
  );
}
