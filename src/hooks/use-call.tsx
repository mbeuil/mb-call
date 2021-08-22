import * as React from 'react';

import { AsyncStatus } from '@/types/async-status';
import { Call, PaginatedRessources } from '@/types';
import { CALLS_LIMIT } from '@/utils';
import { fetchPaginatedCalls } from '@/utils/fetch';

interface CallReducerState {
  callStatus: AsyncStatus;
  callList: Call[];
  callInStore: number;
  totalCallsAvailable: number;
  error?: number;
}

type CallReducerAction =
  | { type: 'START' }
  | { type: 'SUCCESS'; paginatedCalls: PaginatedRessources }
  | { type: 'ERROR'; error: number };

const initialState: CallReducerState = {
  callStatus: AsyncStatus.IDLE,
  callList: [],
  callInStore: 0,
  totalCallsAvailable: 0,
};

const callReducer = (
  state: CallReducerState,
  action: CallReducerAction,
): CallReducerState => {
  switch (action.type) {
    case 'START': {
      return { ...state, callStatus: AsyncStatus.PENDING };
    }
  }
  switch (action.type) {
    case 'SUCCESS': {
      return {
        ...state,
        callStatus: AsyncStatus.RESOLVED,
        callList: action.paginatedCalls.nodes,
        callInStore: action.paginatedCalls.nodes.length,
        totalCallsAvailable: action.paginatedCalls.totalCount,
      };
    }
  }
  switch (action.type) {
    case 'ERROR': {
      return {
        ...state,
        callStatus: AsyncStatus.REJECTED,
        error: action.error,
      };
    }
  }
};

interface UseCall {
  callStatus: AsyncStatus;
  callList: Call[];
  callInStore: number;
  totalCallsAvailable: number;
  fetchCalls: ({ token }: { token: string }) => void;
}

type CallConfig = UseCall | undefined;

const CallContext = React.createContext<CallConfig>(undefined);

export const useCall = (): UseCall => {
  const context = React.useContext(CallContext);

  if (!context) {
    throw new Error('useCall should be used within a CallProvider');
  }
  return context;
};

export const CallProvider: React.FC = ({ ...props }) => {
  const [calls, dispatch] = React.useReducer(callReducer, initialState);

  const callStatus = React.useMemo(() => calls.callStatus, [calls]);

  const callList = React.useMemo(() => calls.callList, [calls]);

  const callInStore = React.useMemo(() => calls.callInStore, [calls]);

  const totalCallsAvailable = React.useMemo(
    () => calls.totalCallsAvailable,
    [calls],
  );

  const fetchCalls = React.useCallback(
    async ({ token }: { token: string }) => {
      dispatch({ type: 'START' });

      fetchPaginatedCalls({
        offset: callInStore,
        limit: callInStore + CALLS_LIMIT,
        token: token,
      })
        .then((paginatedCalls) => dispatch({ type: 'SUCCESS', paginatedCalls }))
        .catch((error: number) => {
          dispatch({ type: 'ERROR', error });
        });
    },
    [callInStore],
  );

  return (
    <CallContext.Provider
      value={{
        callStatus,
        callList,
        callInStore,
        totalCallsAvailable,
        fetchCalls,
      }}
      {...props}
    />
  );
};
