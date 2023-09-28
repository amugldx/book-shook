<script setup lang="ts">
	import { twMerge } from 'tailwind-merge';

	const { iconName, size, folderBg } = defineProps<{
		iconName: string;
		size: string;
		folderBg?: string;
	}>();
	defineEmits(['folderIconClicked']);
</script>

<template>
	<div
		class="grid w-40 h-40 grid-rows-4 transition-all border-2 rounded-lg dark:border-background-50 border-text-900 hover:shadow-lg">
		<div
			@click="$emit('folderIconClicked')"
			:class="
				twMerge(
					'flex items-center justify-center rounded-t-lg bg-secondary-50 row-span-3 border-b-2 dark:border-background-50 border-text-900 hover:cursor-pointer',
					folderBg,
				)
			">
			<Icon
				class="text-text-900"
				:name="iconName"
				:size="size" />
		</div>
		<slot />
	</div>
</template>
