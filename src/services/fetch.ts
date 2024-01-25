const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api`;

export async function getFetch(path: string, options?: RequestInit) {
  const res = await fetch(API_URL + path, options);
  if (res.ok) return res.json();
  // TODO error
}

export function postFetch<ReqData>(path: string, body: ReqData) {
  return fetch(API_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function putFetch<ReqData>(
  path: string,
  body: ReqData,
  options?: Omit<RequestInit, 'method' | 'headers' | 'body'>,
) {
  return fetch(API_URL + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  });
}
