/**
 * @file Manages HTTP Request, Response, and Error for External API Calls
 */

// Third-party modules
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Common Modules
import { sessionStore } from './storage';
import { API_BASE_URL } from '../config/env';

// Constants
const DEFAULT_TIMEOUT = 300000; // Default timeout of 5 minutes
const MAX_CONTENT_LENGTH = 2000000; // Max content length (2MB)
const UNAUTHORIZED = 401; // Unauthorized status code

/**
 * Parses HTTP Response and updates CSRF token for future requests.
 * @function httpResponse
 * @param {AxiosResponse} response - The HTTP response object from an Axios request
 */
const httpResponse = (response) => {
  const csrfToken = response.headers['X-XSRF-TOKEN'];
  if (csrfToken) {
    sessionStore.set('XSRF-TOKEN', csrfToken);
  }
  return response;
};

/**
 * Handles HTTP Errors, including authorization errors (401).
 * @function httpError
 * @param {AxiosError} error - The error object from an Axios request
 * @throws {Error} Rethrows the error after handling it
 */
const httpError = (error) => {
  if (error.response && error.response.status === UNAUTHORIZED) {
    // Trigger a custom event for session expiration (e.g., redirect to login page)
    const customEvent = new CustomEvent('SESSION_EXPIRED');
    document.dispatchEvent(customEvent);
  }

  console.error('HTTP Request Error:', error);
  throw error;
};

/**
 * Creates and configures an Axios HTTP Client.
 * @function httpRequest
 * @param {number} [timeout=DEFAULT_TIMEOUT] - Timeout in milliseconds
 * @returns {AxiosInstance} Axios instance configured with the given timeout and default headers
 */
export const httpRequest = (timeout = DEFAULT_TIMEOUT) => {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    maxContentLength: MAX_CONTENT_LENGTH,
  });

  // Set CSRF token if available
  const csrfToken = sessionStore.get('XSRF-TOKEN');
  if (csrfToken) {
    axiosInstance.defaults.headers['X-XSRF-TOKEN'] = csrfToken;
  }

  // Attach interceptors for response & error handling
  axiosInstance.interceptors.response.use(httpResponse, httpError);

  return axiosInstance;
};

// Export handlers for manual use if needed
export { httpResponse, httpError };
