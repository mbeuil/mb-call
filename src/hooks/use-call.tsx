import * as React from 'react';

import { AsyncStatus, StateOptions } from '@/types';
import { Call } from '@/types';
import { CALLS_LIMIT, fetchCallWithId, fetchPaginatedCalls } from '@/utils';

interface CallReducerState {
  callListStatus: AsyncStatus;
  callStatus: AsyncStatus;
  callList: Call[];
  call?: Call;
  callInStore: number;
  totalCallsAvailable: number;
  stateFilter: StateOptions;
  error?: number;
}

type CallReducerAction =
  | { type: 'FETCH_CALL_LIST_START' }
  | { type: 'FETCH_CALL_LIST_SUCCESS'; paginatedCalls: Call[] }
  | { type: 'FETCH_CALL_LIST_ERROR'; error: number }
  | { type: 'FETCH_CALL_START' }
  | { type: 'FETCH_CALL_SUCCESS'; call: Call | null }
  | { type: 'FETCH_CALL_ERROR'; error: number }
  | { type: 'SET_CALL'; call: Call | undefined }
  | { type: 'SET_STATE_FILTER'; option: StateOptions }
  | { type: 'RESET_FILTER' };

const initialState: CallReducerState = {
  callListStatus: AsyncStatus.IDLE,
  callStatus: AsyncStatus.IDLE,
  callList: [],
  callInStore: 0,
  totalCallsAvailable: 0,
  stateFilter: StateOptions.DISABLE,
};

const callReducer = (
  state: CallReducerState,
  action: CallReducerAction,
): CallReducerState => {
  switch (action.type) {
    case 'FETCH_CALL_LIST_START': {
      return { ...state, callListStatus: AsyncStatus.PENDING };
    }
    case 'FETCH_CALL_LIST_SUCCESS': {
      const sortedCall = action.paginatedCalls.sort((a, b) =>
        a.created_at < b.created_at ? 1 : -1,
      );
      return {
        ...state,
        callListStatus: AsyncStatus.RESOLVED,
        callList: sortedCall,
        totalCallsAvailable: action.paginatedCalls.length,
      };
    }
    case 'FETCH_CALL_LIST_ERROR': {
      return {
        ...state,
        callListStatus: AsyncStatus.REJECTED,
        error: action.error,
      };
    }
    case 'FETCH_CALL_START': {
      return {
        ...state,
        callStatus: AsyncStatus.PENDING,
      };
    }
    case 'SET_CALL':
    case 'FETCH_CALL_SUCCESS': {
      if (!action.call)
        return {
          ...state,
          callStatus: AsyncStatus.REJECTED,
        };
      return {
        ...state,
        callStatus: AsyncStatus.RESOLVED,
        call: action.call,
      };
    }
    case 'FETCH_CALL_ERROR': {
      return {
        ...state,
        callStatus: AsyncStatus.REJECTED,
        error: action.error,
      };
    }
    case 'SET_STATE_FILTER': {
      return {
        ...state,
        stateFilter: action.option,
      };
    }
    case 'RESET_FILTER': {
      return {
        ...state,
        stateFilter: StateOptions.DISABLE,
      };
    }
  }
};

interface UseCall {
  callListStatus: AsyncStatus;
  callStatus: AsyncStatus;
  callList: Call[];
  filteredCallList: Call[];
  callInStore: number;
  totalCallsAvailable: number;
  call?: Call;
  fetchCalls: () => void;
  fetchCall: ({ id }: { id: string }) => void;
  setCall: ({ call }: { call: Call | undefined }) => void;
  setStateFilter: ({ option }: { option: StateOptions }) => void;
  resetFilter: () => void;
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

  const callListStatus = React.useMemo(() => calls.callListStatus, [calls]);

  const callStatus = React.useMemo(() => calls.callStatus, [calls]);

  const callList = React.useMemo(() => calls.callList, [calls]);

  const filteredCallList = React.useMemo(() => {
    const { stateFilter } = calls;
    return callList.filter((call) =>
      stateFilter === StateOptions.ARCHIVE
        ? call.is_archived
        : stateFilter === StateOptions.NOT_ARCHIVE
        ? !call.is_archived
        : true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calls]);

  const call = React.useMemo(() => calls.call, [calls]);

  const callInStore = React.useMemo(() => calls.callInStore, [calls]);

  const totalCallsAvailable = React.useMemo(
    () => calls.totalCallsAvailable,
    [calls],
  );

  const fetchCalls = React.useCallback(async () => {
    dispatch({ type: 'FETCH_CALL_LIST_START' });

    fetchPaginatedCalls({
      offset: 0,
      limit: CALLS_LIMIT,
    })
      .then((paginatedCalls) =>
        dispatch({ type: 'FETCH_CALL_LIST_SUCCESS', paginatedCalls }),
      )
      .catch((error: number) => {
        dispatch({ type: 'FETCH_CALL_LIST_ERROR', error });
      });
  }, []);

  const fetchCall = React.useCallback(({ id }: { id: string }) => {
    dispatch({ type: 'FETCH_CALL_START' });

    fetchCallWithId({ id })
      .then((call) => {
        dispatch({ type: 'FETCH_CALL_SUCCESS', call });
        return call;
      })
      .catch((error: number) => {
        dispatch({ type: 'FETCH_CALL_ERROR', error });
        return null;
      });

    return null;
  }, []);

  const setCall = React.useCallback(({ call }: { call: Call | undefined }) => {
    dispatch({ type: 'SET_CALL', call });
  }, []);

  const setStateFilter = React.useCallback(
    ({ option }: { option: StateOptions }) => {
      dispatch({ type: 'SET_STATE_FILTER', option });
    },
    [],
  );

  const resetFilter = React.useCallback(() => {
    dispatch({ type: 'RESET_FILTER' });
  }, []);

  return (
    <CallContext.Provider
      value={{
        callListStatus,
        callStatus,
        callList,
        filteredCallList,
        callInStore,
        totalCallsAvailable,
        call,
        fetchCalls,
        fetchCall,
        setCall,
        setStateFilter,
        resetFilter,
      }}
      {...props}
    />
  );
};
