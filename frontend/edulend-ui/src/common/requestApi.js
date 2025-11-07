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
        resolve(response.data.data);
      } catch (error) {
        console.error('List Requests API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),

  /**
   * Updates the status of a request by calling the specific PATCH endpoint.
   * @param {string} id - The Request ID.
   * @param {'approve' | 'reject' | 'issue' | 'return'} action - The action to take.
   * @param {string} token
   */
  updateStatus: (id, action, token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const response = await client.patch(
          `${API_PATH}/${id}/${action}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        resolve(response.data.data);
      } catch (error) {
        console.error(`Update Status (${action}) API Error:`, error);
        reject(error.response?.data || error.message);
      }
    }),
};