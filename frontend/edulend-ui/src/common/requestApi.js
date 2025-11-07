// src/common/requestApi.js
import { httpRequest } from './connector/http';

const API_PATH = '/api/requests';

export const RequestAPI = {
  /**
   * Creates a new borrowing request.
   * @param {Object} payload - { equipment, quantity, from, to }
   * @param {string} token
   */
  create: (payload, token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const response = await client.post(API_PATH, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        resolve(response.data.data);
      } catch (error) {
        console.error('Create Request API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),

  /**
   * Lists all requests (for admin) or user's requests.
   * @param {string} token
   */
  list: (token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const response = await client.get(API_PATH, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // The backend controller populates 'equipment' but not 'user'
        // We will need to fetch user details separately if needed, but for now this is fine
        resolve(response.data.data);
      } catch (error) {
        console.error('List Requests API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),

  /**
   * Approves or rejects a request.
   * @param {string} id - The Request ID.
   * @param {'approve' | 'reject'} action - The action to take.
   * @param {string} token
   */
  approveOrReject: (id, action, token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const response = await client.post(
          `${API_PATH}/${id}/approve`,
          { action }, // Send { action: 'approve' } or { action: 'reject' } in the body
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        resolve(response.data.data); // Returns the updated request
      } catch (error) {
        console.error('Approve/Reject API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),
};