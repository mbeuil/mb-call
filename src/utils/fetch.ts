import axios, { AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/client';

import { Call, PaginatedRessources } from '@/types';
import { API_BASE_URL } from '@/utils';

interface FetchPaginatedCallsProps {
  offset: number;
  limit: number;
  calls?: Call[];
}

export async function fetchPaginatedCalls({
  offset,
  limit,
  calls = [],
}: FetchPaginatedCallsProps): Promise<Call[]> {
  const url = API_BASE_URL + '/calls';
  const data = await authRequest<PaginatedRessources>({
    method: 'get',
    url,
    params: { offset, limit },
  });

  return data.hasNextPage
    ? fetchPaginatedCalls({
        offset: offset + limit,
        limit,
        calls: [...calls, ...data.nodes],
      })
    : [...calls, ...data.nodes];
}

interface CallWithIdProps {
  id: string;
}

export async function fetchCallWithId({
  id,
}: CallWithIdProps): Promise<Call | null> {
  const url = API_BASE_URL + `/calls/${id}`;
  const data = await authRequest<Call | null>({
    method: 'get',
    url,
  });

  return data;
}

export async function changeCallState({
  id,
}: CallWithIdProps): Promise<Call | null> {
  const url = API_BASE_URL + `/calls/${id}/archive`;
  const data = await authRequest<Call | null>({
    method: 'put',
    url,
  });

  return data;
}

export async function authRequest<T>({
  method,
  url,
  params,
}: AxiosRequestConfig): Promise<T> {
  const session = await getSession();
  const response = await axios({
    method,
    url,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    params,
  }).catch((e) => {
    throw new Error(e.response.data.statusCode);
  });

  return response.data;
}
