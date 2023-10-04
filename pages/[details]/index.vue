<script setup lang="ts">
	definePageMeta({
		middleware: ['folder-middleware'],
	});

	const openModal = ref<boolean>(false);
</script>

<template>
	<div>
		<LinkView
			@new-link-clicked="openModal = true"
			:folder-name="$route.params.details.toString()" />
		<Transition
			name="custom-classes"
			enter-active-class="animate__animated animate__fadeIn animate__faster"
			leave-active-class="animate__animated animate__fadeOut animate__faster"
			mode="out-in">
			<Modal
				@close-modal="openModal = false"
				v-if="openModal">
				<template #header>
					<h3 class="text-lg font-bold md:text-xl lg:text-2xl text-text-900 dark:text-text-50"
						>Add New Link</h3
					>
				</template>
				<template #default></template>
				<template #footer>
					<UiButton
						intent="accent"
						size="large">
						Submit
					</UiButton>
				</template>
			</Modal>
		</Transition>
	</div>
</template>
