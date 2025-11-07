import { httpRequest } from './connector/http';

const API_PATH = '/api/equipments'; 

const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const EquipmentAPI = {
  /**
   * Fetches all equipment.
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
   */
  create: (payload, token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        
        const reqData = {
          name: capitalizeFirst(payload.name),
          category: capitalizeFirst(payload.category),
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
   */
  update: (id, payload, token) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        
        const reqData = {
          name: capitalizeFirst(payload.name),
          category: capitalizeFirst(payload.category),
          condition: payload.condition,
          quantity: parseInt(payload.quantity, 10),
          available: parseInt(payload.available, 10),
        };
        
        const response = await client.patch(`${API_PATH}/${id}`, reqData, {
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