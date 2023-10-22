export default defineNuxtRouteMiddleware((to, from) => {
	const { folders } = storeToRefs(useFolderStore());
	const foldersList = folders.value?.map(folder => {
		return folder.name;
	});
	if (!foldersList?.includes(to.params.details.toString())) {
		return navigateTo('/');
	}
});
