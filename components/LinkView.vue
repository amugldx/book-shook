<script setup lang="ts">
	const { folderName } = defineProps<{
		folderName: string;
	}>();

	defineEmits(['newLinkClicked']);

	const renameFolderClicked = ref<boolean>(false);
	const renameFolderInputElement = ref<HTMLInputElement>();

	function renameFolder() {
		renameFolderClicked.value = true;
	}
	function deleteFolder() {}

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
				ref="renameFolderInputElement"
				@focusout="renameFolderClicked = false"
				class="text-xl bg-transparent focus:outline-none focus:ring-0 dark:text-background-50 text-text-900 md:text-2xl lg:text-3xl xl:text-4xl font-bold max-w-[50%]"
				type="text" />
			<h1
				v-else
				class="text-xl dark:text-background-50 text-text-900 md:text-2xl lg:text-3xl xl:text-4xl font-bold max-w-[50%]"
				>{{ folderName }}</h1
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
					@click="renameFolder"
					intent="secondary"
					size="large"
					><Icon
						name="solar:pen-outline"
						size="20px"
				/></UiButton>
				<UiButton
					@click="deleteFolder"
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
