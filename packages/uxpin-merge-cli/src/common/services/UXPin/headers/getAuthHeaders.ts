export interface UXPinAuthHeaders {
  'auth-token': string;
}

export function getAuthHeaders(token: string): UXPinAuthHeaders {
  return {
    'auth-token': token,
  };
}
