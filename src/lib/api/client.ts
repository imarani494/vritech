import { ApiError, RequestOptions } from '@/types/api';

const BASE_URL = 'https://fakestoreapi.com';

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    params,
    body,
    timeoutMs = 10000,
    headers: customHeaders,
    revalidate,
    ...customInit
  } = options;

  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
  }

  const queryString = searchParams.toString();
  const fullEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${fullEndpoint}${queryString ? `?${queryString}` : ''}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...((customHeaders as Record<string, string>) || {}),
  };

  const nextConfig: { next?: { revalidate?: number | false } } = {};
  if (revalidate !== undefined) {
    nextConfig.next = { revalidate };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...customInit,
      ...nextConfig,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let data: unknown;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : null;
    }

    if (!response.ok) {
      const errorMessage =
        typeof data === 'object' && data !== null && 'message' in data
          ? String((data as { message: unknown }).message)
          : `HTTP error! Status: ${response.status} ${response.statusText}`;

      throw new ApiError(errorMessage, {
        status: response.status,
        statusText: response.statusText,
        data,
      });
    }

    return data as T;
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(`Request timed out after ${timeoutMs}ms`, {
        isNetworkError: true,
      });
    }

    const message =
      error instanceof Error ? error.message : 'An unexpected network error occurred';

    throw new ApiError(message, {
      isNetworkError: true,
    });
  }
}
