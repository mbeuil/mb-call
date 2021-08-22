export interface PaginatedRessources {
  nodes: Call[];
  totalCount: number;
  hasNextPage: boolean;
}

export interface Call {
  id: string; // "unique ID of call"
  direction: string; // "inbound" or "outbound" call
  from: string; // Caller's number
  to: string; // Callee's number
  duration: number; // Duration of a call (in seconds)
  is_archived: boolean; // Boolean that indicates if the call is archived or not
  call_type: string; // The type of the call, it can be a missed, answered or voicemail.
  via: string; // Aircall number used for the call.
  created_at: string; // When the call has been made.
  notes: Note[]; // Notes related to a given call
}

export interface Note {
  id: string;
  content: string;
}

export interface User {
  id: string;
  username: string;
}
