import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  // Carrega a lista global de tipos de serviço para o dropdown
  const response = await fetch('http://localhost:3000/api/services/types');
  if (!response.ok) {
    return { error: 'Não foi possível carregar os tipos de serviço.' };
  }
  const serviceTypes = await response.json();
  return { serviceTypes };
};

export const actions: Actions = {
  createService: async ({ request, cookies, fetch }) => {
    const token = cookies.get('authToken');
    if (!token) {
      throw redirect(303, '/auth/login');
    }

    const data = await request.formData();
    const variations = JSON.parse(data.get('variations') as string);
    
    const serviceData = {
      name: data.get('name'),
      description: data.get('description'),
      serviceTypeId: Number(data.get('serviceTypeId')),
      variations: variations
    };

    const response = await fetch('http://localhost:3000/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        return fail(response.status, { error: errorData.error });
    }

    return { success: true };
  }
};