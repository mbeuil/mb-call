import { PaginatedRessources } from '@/types';
import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './config';

interface FetchPaginatedCallsProps {
  offset: number;
  limit: number;
  token: string;
}

export async function fetchPaginatedCalls({
  offset,
  limit,
  token,
}: FetchPaginatedCallsProps): Promise<PaginatedRessources> {
  const url = API_BASE_URL + '/calls';
  const data = await authRequest<PaginatedRessources>({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { offset, limit },
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
