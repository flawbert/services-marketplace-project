<script lang="ts">
	type ActionData = {
		error?: string;
		success?: boolean;
	};

	export let form: ActionData;
</script>

<main class="container">
	<h1>Create your Provider Account</h1>
	<p>Start to offer services in our plataform</p>

	<form method="POST" action="?/register">
		<div class="form-group">
			<label for="name">Full Name</label>
			<input type="text" id="name" name="name" required />
		</div>

		<div class="form-group">
			<label for="email">E-mail</label>
			<input type="email" id="email" name="email" required />
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input type="password" id="password" name="password" minlength="6" required />
		</div>

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}

		{#if form?.success}
			<p class="success">Register successfull! You can now login.</p>
		{/if}

		<button type="submit">Register</button>
	</form>
</main>

<style>
	.container {
		max-width: 500px;
		margin: 2rem auto;
		padding: 1rem;
	}
	.form-group {
		margin-bottom: 1rem;
	}
	label {
		display: block;
		margin-bottom: 0.25rem;
	}
	input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
	}
	.error {
		color: red;
	}
	.success {
		color: green;
	}
</style>