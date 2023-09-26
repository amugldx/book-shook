<script setup lang="ts">
	import { cva } from 'class-variance-authority';
	import { twMerge } from 'tailwind-merge';

	const buttonClass = computed(() => {
		return twMerge(
			cva(
				'px-3 py-1 rounded-lg flex hover:shadow-md focus:shadow-md justify-center items-center transition-all',
				{
					variants: {
						intent: {
							primary: 'bg-primary-100 text-text-900 hover:bg-primary-200',
							secondary: 'bg-secondary-100 text-text-900 hover:bg-secondary-200',
							accent: 'bg-accent-100 text-text-900 hover:bg-accent-200',
						},
						size: {
							icon: 'h-10 w-10 px-1 py-1',
						},
					},
				},
			)({
				intent: intent,
				size: size,
			}),
		);
	});

	const { intent = 'primary', size } = defineProps<{
		intent: 'primary' | 'secondary' | 'accent';
		size?: 'icon';
	}>();
</script>

<template>
	<div>
		<button :class="buttonClass"><slot /></button>
	</div>
</template>
