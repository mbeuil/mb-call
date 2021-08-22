import { Direction } from '@/types';
import { Inbound } from './inbound';
import { Outbound } from './outbound';

interface SocialsProps {
  direction?: Direction;
  className?: string;
}

export function CallDirection({
  direction,
  className,
}: SocialsProps): JSX.Element {
  switch (direction) {
    default:
    case Direction.INBOUND:
      return <Inbound className={className} />;
    case Direction.OUTBOUND:
      return <Outbound className={className} />;
  }
}
