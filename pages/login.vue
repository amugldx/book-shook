<script setup lang="ts">
	const username = ref<string>('test');
	const password = ref<string>('test');

	const isLoading = ref<boolean>(false);

	async function login() {
		const { data, pending } = await useFetch('/api/login', {
			method: 'POST',
			body: {
				username: username.value,
				password: password.value,
			},
		});
		isLoading.value = pending.value;
		if (data) {
			isLoading.value = false;
			navigateTo('/');
		}
	}

	definePageMeta({
		layout: false,
	});
</script>

<template>
	<div class="grid w-full h-screen grid-cols-1 lg:grid-cols-2">
		<div
			class="items-center justify-center hidden w-full h-full text-text-50 lg:visible lg:flex bg-background-950">
			<div>
				<h2 class="text-2xl font-bold transition-all lg:text-3xl">Book Shook</h2>
				<p class="mt-6 mb-8"
					>Web application to bookmark your urls <br />
					in organized folders.</p
				>
			</div>
		</div>
		<div
			class="flex items-center justify-center w-full h-full bg-background-950 lg:bg-background-50">
			<div class="w-full p-5 mx-4 rounded-lg md:mx-40 lg:mx-4 bg-text-50">
				<div class="lg:hidden">
					<h2 class="text-2xl font-bold transition-all lg:text-3xl">Book Shook</h2>
					<p class="mb-8"
						>Web application to bookmark your urls <br />
						in organized folders.</p
					>
				</div>
				<p class="mb-8"
					><b>This project is in personal use.</b><br />For testing enter <b>"test"</b> in both
					username and password feilds.</p
				>
				<form @submit.prevent="login">
					<UiInput
						type="text"
						label="Username"
						v-model="username"
						class="mb-4"
						:focus="true" />
					<UiInput
						class="mb-8"
						type="password"
						v-model="password"
						label="Password" />
					<div class="flex justify-end">
						<UiButton
							@handleClick="login"
							intent="primary"
							size="large"
							:disabled="isLoading"
							type="submit"
							>Login</UiButton
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
