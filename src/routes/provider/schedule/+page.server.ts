import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = async ({ fetch, cookies }) => {
  const token = cookies.get('authToken');
  if (!token) throw redirect(303, '/auth/login');

  const response = await fetch('http://localhost:3000/api/availability', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    return { schedule: [] };
  }
  
  const schedule = await response.json();
  return { schedule };
};

// A ação 'save' envia a nova agenda para a API
export const actions: Actions = {
  save: async ({ request, cookies, fetch }: import('@sveltejs/kit').RequestEvent) => {
    const token = cookies.get('authToken');
    if (!token) throw redirect(303, '/auth/login');

    const data = await request.formData();
    const schedule = JSON.parse(data.get('schedule') as string);
    
    const response = await fetch('http://localhost:3000/api/availability', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ schedule })
    });

    if (!response.ok) {
      return fail(500, { error: 'Error while saving availability schedule.' });
    }

    return { success: true };
  }
};