import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('http://localhost:3000/api/services/types');
  if (!response.ok) {
    return { error: 'ERROR while loading services types.' };
  }
  const serviceTypes = await response.json();
  return { serviceTypes };
};

export const actions: Actions = {
  // Renomeado para 'createService' por clareza
  createService: async ({ request, cookies, fetch }) => { 
    const token = cookies.get('authToken');
    if (!token) throw redirect(303, '/auth/login');

    const data = await request.formData();
    
    // Parse dos campos JSON que vêm do formulário
    const photos = JSON.parse(data.get('photos') as string);
    const variations = JSON.parse(data.get('variations') as string);

    const payload = {
      name: data.get('name'),
      description: data.get('description'),
      serviceTypeId: data.get('serviceTypeId'),
      photos,
      variations
    };

    const response = await fetch('http://localhost:3000/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorText = 'Error creating service.';
      try {
        const err = await response.json();
        errorText = err.error || JSON.stringify(err);
      } catch (e) {
        errorText = await response.text();
      }
      return fail(response.status, { error: errorText }); // Alterado para 'error'
    }

    return { success: true };
  }
  // A action 'delete' foi removida pois não pertence a esta página
};