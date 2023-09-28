<script setup lang="ts">
	const {} = defineProps<{
		folderName: string;
	}>();

	function renameFolder() {}
	function deleteFolder() {}
</script>

<template>
	<main class="pt-5 md:pt-6 lg:pt-9 xl:pt-10">
		<div class="flex items-center justify-between">
			<h1
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
				@folder-icon-clicked=""
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
