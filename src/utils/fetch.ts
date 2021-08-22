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
  const session = await getSession();
  const url = API_BASE_URL + '/calls';
  const data = await authRequest<PaginatedRessources>({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
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

interface FetchCallWithIdProps {
  id: string;
}

export async function fetchCallWithId({
  id,
}: FetchCallWithIdProps): Promise<Call | null> {
  const session = await getSession();
  const url = API_BASE_URL + `/calls/${id}`;
  const data = await authRequest<Call | null>({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return data;
}

export async function authRequest<T>({
  method,
  url,
  headers,
  params,
}: AxiosRequestConfig): Promise<T> {
  const response = await axios({
    method,
    url,
    headers,
    params,
  }).catch((e) => {
    throw new Error(e.response.data.statusCode);
  });

  return response.data;
}
