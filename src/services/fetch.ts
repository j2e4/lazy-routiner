const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api`;

interface GetRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export async function getFetch(
  path: string,
  { params, ...options }: GetRequestOptions,
) {
  if (params !== undefined) {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      const value = String(params[key]);
      searchParams.append(key, value);
    }
    path += '?';
    path += searchParams.toString();
  }

  const res = await fetch(API_URL + path, options);
  if (res.ok) return res.json();
  else throw new Error(); // TODO error
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
