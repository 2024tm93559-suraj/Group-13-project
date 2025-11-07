// src/common/notificationApi.js
import { httpRequest } from './connector/http';

const API_PATH = '/api/notifications';

export const NotificationAPI = {
  /**
   * Fetches all notifications for the logged-in user.
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
        console.error('List Notifications API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),
  
  // Note: We'll add a 'mark as read' API call later if needed.
  // For now, we'll just show the unread count.
};