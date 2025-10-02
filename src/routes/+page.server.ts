import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // Fetch services from the backend API
    const response = await fetch('http://localhost:5000/api/services');
    
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const services = await response.json();
    
    return {
      services
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    return {
      services: []
    };
  }
};