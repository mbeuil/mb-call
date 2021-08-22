import { Call } from '@/types';

interface FindCallInArrayProps {
  callList: Call[];
  cid: string;
}

export function findCallInArray({
  callList,
  cid,
}: FindCallInArrayProps): Call | undefined {
  return callList.find((Call) => Call.id === cid);
}
