<script setup lang="ts">
	import { folders } from '../data';

	const addFolderClicked = ref<boolean>(false);
	const addFolderInput = ref<HTMLInputElement>();

	function addFolder() {
		addFolderClicked.value = true;
	}
	watchEffect(() => {
		if (addFolderInput.value) {
			addFolderInput.value.focus();
		}
	});
</script>

<template>
	<div
		class="grid justify-center grid-cols-2 mt-6 lg:mt-10 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
		<Folder
			@folder-icon-clicked="addFolder"
			folder-bg="bg-primary-100"
			class="justify-self-center"
			icon-name="ph:folder-plus-thin"
			size="100px">
			<div class="flex items-center justify-center text-xs text-text-900 dark:text-background-50"
				><input
					v-if="addFolderClicked"
					ref="addFolderInput"
					type="text"
					@focusout="addFolderClicked = false"
					class="w-full h-full px-2 bg-transparent rounded-b-md dark:bg-transparent dark:text-background-50 focus:outline-none focus:ring-0" />
				<span
					class="font-medium"
					@click="addFolder"
					v-else
					>Add New Folder</span
				>
			</div>
		</Folder>
		<div
			class="justify-self-center"
			v-for="folder in folders"
			:key="folder.id">
			<Folder
				@folder-icon-clicked="$router.push({ path: `/${folder.name}` })"
				folder-bg="bg-secondary-100"
				icon-name="ph:folder-thin"
				size="100px">
				<div
					class="flex items-center justify-center text-xs font-medium text-text-900 dark:text-background-50"
					>{{ folder.name }}</div
				>
			</Folder>
		</div>
	</div>
</template>
