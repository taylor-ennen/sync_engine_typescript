import axios from 'axios';

export async function apiCall(endpoint: string, auth: any): Promise<any> {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}