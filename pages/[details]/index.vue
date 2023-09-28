<script setup lang="ts">
	definePageMeta({
		middleware: ['folder-middleware'],
	});
</script>

<template>
	<div>
		<LinkView :folder-name="$route.params.details.toString()" />
	</div>
</template>
