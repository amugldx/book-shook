<script setup lang="ts">
	import { cva } from 'class-variance-authority';
	import { twMerge } from 'tailwind-merge';

	const buttonClass = computed(() => {
		return twMerge(
			cva(
				'px-4 py-1 disabled:cursor-not-allowed disabled:opacity-80 rounded-lg flex hover:shadow-md  justify-center items-center transition-all',
				{
					variants: {
						intent: {
							primary: 'bg-primary-100 text-text-900 hover:bg-primary-200',
							secondary: 'bg-secondary-100 text-text-900 hover:bg-secondary-200',
							accent: 'bg-accent-100 text-text-900 hover:bg-accent-200',
						},
						size: {
							icon: 'h-10 w-10 px-1 py-1',
							large: 'h-10',
						},
					},
				},
			)({
				intent: intent,
				size: size,
			}),
		);
	});

	const {
		intent = 'primary',
		isLoading,
		size,
		type,
	} = defineProps<{
		intent: 'primary' | 'secondary' | 'accent';
		size?: 'icon' | 'large';
		type?: 'submit';
		isLoading?: boolean;
	}>();
</script>

<template>
	<div>
		<button
			:class="buttonClass"
			:type="type"
			:disabled="isLoading"
			><slot
		/></button>
	</div>
</template>
