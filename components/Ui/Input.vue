<script setup lang="ts">
	const inputValue = defineModel<string>();
	const { type = 'text', focus } = defineProps<{
		type?: 'text' | 'password';
		label: string;
		focus?: boolean;
	}>();

	const inputRef = ref<HTMLInputElement>();

	watchEffect(() => {
		if (focus) {
			inputRef.value?.focus();
		}
	});
</script>

<template>
	<div class="flex flex-col md:flex-row md:items-center">
		<label
			class="mb-2 text-text-900 md:mb-0 md:mr-8 md:text-lg dark:text-text-50"
			:for="label.toLowerCase()"
			>{{ label }}</label
		>
		<input
			class="h-10 px-3 bg-transparent border-2 rounded-md focus:ring-0 focus:ring-offset-0 md:w-full text-text-900 dark:text-text-50 border-text-900 dark:border-text-50"
			:type="type"
			ref="inputRef"
			v-model="inputValue"
			:id="label.toLowerCase()" />
	</div>
</template>
