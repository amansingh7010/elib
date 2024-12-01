import { fail, redirect } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
	email: string;
	password: string;
	name: string;
	passwordConfirmation: string;
	errors: string[];
}

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('passwordConfirmation') as string;

		const returnObject: ReturnObject = {
			success: true,
			name,
			email,
			password,
			passwordConfirmation,
			errors: []
		};

		if (name.length < 3) {
			returnObject.errors.push('Name should be at least 3 characters long');
		}

		if (!email.length) {
			returnObject.errors.push('Email is required');
		}

		if (!password.length) {
			returnObject.errors.push('Password is required');
		}

		if (password !== passwordConfirmation) {
			returnObject.errors.push('Passwords do not match');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		// Registration Flow
		const { error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			returnObject.success = false;

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return fail(400, returnObject);
		}

		redirect(303, '/private/dashboard');
	}
};
