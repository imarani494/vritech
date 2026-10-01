export interface ApiErrorOptions {
  status?: number;
  statusText?: string;
  data?: unknown;
  isNetworkError?: boolean;
}

export class ApiError extends Error {
  public readonly status?: number;
  public readonly statusText?: string;
  public readonly data?: unknown;
  public readonly isNetworkError: boolean;

  constructor(message: string, options: ApiErrorOptions = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status;
    this.statusText = options.statusText;
    this.data = options.data;
    this.isNetworkError = options.isNetworkError ?? false;

    // Maintain proper prototype chain
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  timeoutMs?: number;
  revalidate?: number | false;
}
