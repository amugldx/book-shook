<script setup lang="ts">
	const store = useFolderStore();
	const linkStore = useLinkStore();
	const { addNewLink } = linkStore;
	const {} = storeToRefs(linkStore);
	const { currentFolder } = storeToRefs(store);

	definePageMeta({
		middleware: ['folder-middleware'],
	});

	const openModal = ref<boolean>(false);
	const nameInputValue = ref<string>();
	const linkInputValue = ref<string>();

	async function onAddNewLink() {
		if (nameInputValue.value && linkInputValue.value && currentFolder.value) {
			await addNewLink(nameInputValue.value, linkInputValue.value, currentFolder.value?.id);
			openModal.value = false;
		}
	}
</script>

<template>
	<div>
		<LinkView
			@new-link-clicked="openModal = true"
			:currentFolder="currentFolder" />
		<Transition
			name="custom-classes"
			enter-active-class="animate__animated animate__fadeIn animate__faster"
			leave-active-class="animate__animated animate__fadeOut animate__faster"
			mode="out-in">
			<UiModal
				@close-modal="openModal = false"
				v-if="openModal">
				<template #header>
					<h3 class="text-lg font-bold md:text-xl lg:text-2xl text-text-900 dark:text-text-50"
						>Add New Link</h3
					>
				</template>
				<template #default>
					<div class="space-y-4">
						<UiInput
							label="Name"
							:focus="true"
							v-model="nameInputValue" />
						<UiInput
							label="Link"
							v-model="linkInputValue" />
					</div>
				</template>
				<template #footer>
					<UiButton
						@handle-click="onAddNewLink"
						type="submit"
						intent="accent"
						size="large">
						Submit
					</UiButton>
				</template>
			</UiModal>
		</Transition>
	</div>
</template>
