<script setup lang="ts">
	const isDark = useDark();
	const toggleDark = useToggle(isDark);

	async function handleLogout() {
		const { data } = await useFetch('/api/logout');
		if (data) {
			navigateTo('/login');
		}
	}
</script>

<template>
	<nav
		class="flex items-center justify-between px-3 py-2 border-2 rounded-lg lg:px-5 border-text-900 dark:border-text-50">
		<h1
			@click="navigateTo('/')"
			class="text-xl font-bold transition-all hover:cursor-pointer md:text-2xl lg:text-3xl text-text-900 dark:text-text-50">
			Book Shook
		</h1>
		<ul class="flex space-x-2 lg:space-x-3">
			<li>
				<UiButton
					@handle-click="toggleDark()"
					intent="primary"
					size="icon">
					<Transition
						name="custom-classes"
						enter-active-class="animate__animated animate__fadeIn animate__faster"
						leave-active-class="animate__animated animate__fadeOut animate__faster"
						mode="out-in">
						<Icon
							v-if="isDark"
							name="solar:sun-2-outline"
							size="25px" />
						<Icon
							v-else
							name="solar:moon-outline"
							size="25px" />
					</Transition>
				</UiButton>
			</li>
			<li>
				<UiButton
					@handle-click="handleLogout"
					intent="accent"
					size="icon">
					<Icon
						name="solar:logout-outline"
						size="25px" />
				</UiButton>
			</li>
		</ul>
	</nav>
</template>
