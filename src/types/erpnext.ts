export interface ERPNextResponse<T = unknown> {
  data: T;
  message?: string;
}

export interface ERPNextListResponse<T> {
  data: T[];
  total_count?: number;
}

export interface ERPNextError {
  exc_type: string;
  exception: string;
  _server_messages?: string;
}

export enum AuthMode {
  API_KEY = 'api_key',
  OAUTH = 'oauth',
}