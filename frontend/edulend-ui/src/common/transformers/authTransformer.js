/**
 * @file transformer.js
 * @description Centralized file for transforming API request and response payloads.
 * Used to standardize data shapes between UI components and backend APIs.
 */

// ======================= REQUEST TRANSFORMERS ======================= //

/**
 * Transform signup form data to API payload.
 * @param {Object} data - Raw form input from SignupForm.
 * @returns {Object} - Standardized API request body.
 */
export const transformRegisterRequest = (data) => ({
    name: data?.name?.trim(),
    email: data?.email?.toLowerCase(),
    password: data?.password,
    role: data?.role,
});

/**
 * Transform login form data to API payload.
 * @param {Object} data - Raw form input from LoginForm.
 * @returns {Object} - Standardized API request body.
 */
export const transformLoginRequest = (data) => ({
    email: data?.email?.toLowerCase(),
    password: data?.password,
});

// ======================= RESPONSE TRANSFORMERS ======================= //

/**
 * Transform backend response after successful registration.
 * @param {Object} res - Raw response from backend API.
 * @returns {Object} - Simplified response object for frontend.
 */
export const transformRegisterResponse = (res) => ({
    id: res?.id,
    fullName: res?.name,
    email: res?.email,
    role: res?.role,
});

/**
 * Transform backend response after successful login.
 * @param {Object} res - Raw response from backend API.
 * @returns {Object} - Simplified response object for frontend.
 */
export const transformLoginResponse = (res) => ({
    token: res?.token,
});

// ======================= UNIVERSAL TRANSFORM UTILS ======================= //

/**
 * Generic function for safely transforming API responses.
 * @param {Function} transformer - Transformer function.
 * @param {Object} data - Data to transform.
 * @returns {Object} - Transformed data or original on failure.
 */
export const safeTransform = (transformer, data) => {
    try {
        return transformer(data);
    } catch (err) {
        console.error('Transformer Error:', err);
        return data; // fallback to original data
    }
};
