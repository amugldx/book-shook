<script setup lang="ts">
	const store = useFolderStore();
	const { renameFolder, deleteFolder } = store;
	const { currentFolder } = storeToRefs(store);

	defineEmits(['newLinkClicked']);

	const renameFolderClicked = ref<boolean>(false);
	const renameFolderInputElement = ref<HTMLInputElement>();
	const renameInput = ref<string>();

	function onRenameFolderClicked() {
		renameFolderClicked.value = true;
	}

	async function onRenameFolder() {
		if (renameInput.value && currentFolder.value) {
			await renameFolder(currentFolder.value.id, renameInput.value);
		}
		renameFolderClicked.value = false;
	}

	async function onDeleteFolder(folderId: string | undefined) {
		if (folderId) {
			await deleteFolder(folderId);
			navigateTo('/');
		}
	}

	watchEffect(() => {
		if (renameFolderClicked) {
			renameFolderInputElement.value?.focus();
		}
	});
</script>

<template>
	<main class="pt-5 md:pt-6 lg:pt-9 xl:pt-10">
		<div class="flex items-center justify-between">
			<input
				v-if="renameFolderClicked"
				v-model="renameInput"
				ref="renameFolderInputElement"
				@focusout="onRenameFolder"
				@keyup.enter="onRenameFolder"
				class="text-xl bg-transparent focus:outline-none focus:ring-0 dark:text-background-50 text-text-900 md:text-2xl lg:text-3xl xl:text-4xl font-bold max-w-[50%]"
				type="text" />
			<h1
				v-else
				class="text-xl dark:text-background-50 text-text-900 md:text-2xl lg:text-3xl xl:text-4xl font-bold max-w-[50%]"
				>{{ currentFolder?.name }}</h1
			>
			<div class="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
				<UiButton
					@click="$router.push('/')"
					intent="primary"
					size="icon"
					><Icon
						name="solar:arrow-left-outline"
						size="20px"
				/></UiButton>
				<UiButton
					@handle-click="onRenameFolderClicked"
					intent="secondary"
					size="large"
					><Icon
						name="solar:pen-outline"
						size="20px"
				/></UiButton>
				<UiButton
					@handle-click="onDeleteFolder(currentFolder?.id)"
					intent="accent"
					size="icon"
					><Icon
						name="solar:trash-bin-minimalistic-outline"
						size="20px"
				/></UiButton>
			</div>
		</div>
		<div class="flex items-center justify-center pt-5 md:pt-6 lg:pt-9 xl:pt-1">
			<Folder
				@folder-icon-clicked="$emit('newLinkClicked')"
				folder-bg="bg-accent-100"
				icon-name="solar:link-outline"
				size="60px">
				<div
					class="flex items-center justify-center text-xs font-medium text-text-900 dark:text-background-50"
					>Add New Link</div
				>
			</Folder>
		</div>
		<LinkDetails />
	</main>
</template>
