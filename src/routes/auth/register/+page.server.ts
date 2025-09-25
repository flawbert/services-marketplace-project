import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ request }: import('@sveltejs/kit').RequestEvent) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const password = data.get('password');

		if (!name || !email || !password) {
			return fail(400, { error: 'Please, fill all the fields.' });
		}

		try {
			// 3. Fazer a chamada para a nossa API Backend
			const response = await fetch('http://localhost:3000/api/providers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
					password
				})
			});
			if (!response.ok) {
				const errorData = await response.json();
				return fail(response.status, { error: errorData.error || 'Fail to register.' });
			}

			// Se o cadastro foi um sucesso (status 201), podemos redirecionar o usuário
			// para a página de login, por exemplo.
			// throw redirect(303, '/auth/login');

            // Ou simplesmente retornar uma mensagem de sucesso
            return { success: true };

		} catch (error) {
			console.error('Error with the API connection', error);
			return fail(500, { error: 'Error. We could not connect with the server. Try again later.' });
		}
	}
};