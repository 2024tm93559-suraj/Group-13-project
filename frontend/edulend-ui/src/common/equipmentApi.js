import { httpRequest } from './connector/http';

const API_PATH = '/api/equipments'; 

export const EquipmentAPI = {
  /**
   * Fetches all equipment.
   * @param {string | null} token - The JWT token (optional).
   */
  list: (token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const config = {};
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
        const response = await client.get(API_PATH, config);
        resolve(response.data.data);
      } catch (error) {
        console.error('List Equipment API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),

  /**
   * Creates a new equipment item.
   * @param {Object} payload - New equipment data.
   * @param {string} token - The JWT token (must be admin).
   */
  create: (payload, token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const reqData = {
          name: payload.name,
          category: payload.category,
          condition: payload.condition,
          quantity: parseInt(payload.quantity, 10),
          available: parseInt(payload.quantity, 10),
        };

        const response = await client.post(API_PATH, reqData, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        resolve(response.data.data);
      } catch (error) {
        console.error('Create Equipment API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),

  /**
   * Updates an existing equipment item.
   * @param {string} id - The ID of the equipment to update.
   * @param {Object} payload - Equipment data to update.
   * @param {string} token - The JWT token (must be admin).
   */
  update: (id, payload, token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const reqData = {
          name: payload.name,
          category: payload.category,
          condition: payload.condition,
          quantity: parseInt(payload.quantity, 10),
          available: parseInt(payload.available, 10),
        };
        
        const response = await client.put(`${API_PATH}/${id}`, reqData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resolve(response.data.data);
      } catch (error) {
        console.error('Update Equipment API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),

  /**
   * Deletes an equipment item.
   * @param {string} id - The ID of the equipment to delete.
   * @param {string} token - The JWT token (must be admin).
   */
  remove: (id, token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        await client.delete(`${API_PATH}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resolve({ id });
      } catch (error) {
        console.error('Delete Equipment API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),
};