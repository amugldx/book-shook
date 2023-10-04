<script setup lang="ts">
	defineEmits(['closeModal']);
</script>

<template>
	<div>
		<div
			@click="$emit('closeModal')"
			class="fixed inset-0 dark:bg-white/20 bg-black/40">
		</div>
		<div
			class="fixed inset-0 top-[50%] translate-y-[-50%] px-5 flex flex-col mx-10 h-fit bg-background-50 dark:bg-background-950 rounded-lg lg:mx-[15%]">
			<div class="flex items-center justify-between py-4">
				<slot name="header" />
				<UiButton
					@click="$emit('closeModal')"
					intent="primary"
					size="icon"
					><Icon
						name="ic:outline-close"
						size="25px"
				/></UiButton>
			</div>
			<div class="text-text-900 dark:text-text-50"><slot>Body goes here</slot></div>
			<div class="flex items-center justify-end py-4">
				<slot name="footer" />
			</div>
		</div>
	</div>
</template>
