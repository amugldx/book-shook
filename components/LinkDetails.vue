<script setup lang="ts">
	const store = useLinkStore();
	const folderStore = useFolderStore();
	const { currentFolder } = storeToRefs(folderStore);
	const { fetchAllLinks } = store;
	const { links } = storeToRefs(store);

	onMounted(async () => {
		if (currentFolder.value) {
			await fetchAllLinks(currentFolder.value?.id);
		}
	});
</script>

<template>
	<div
		class="grid justify-center grid-cols-2 mt-6 lg:mt-10 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
		<SingleLink
			v-for="link in links"
			:link="link.url"
			:id="link.id"
			:link-name="link.name" />
	</div>
</template>
