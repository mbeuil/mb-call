import { CallType } from '@/types';

export const getCallColor = (type?: CallType): string => {
  switch (type) {
    case CallType.MISSED:
      return ' text-red-400';
    case CallType.ANSWERED:
      return ' text-green';
    default:
    case CallType.VOICEMAIL:
      return ' text-secondary';
  }
};
