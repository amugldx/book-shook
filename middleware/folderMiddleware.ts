import { folders } from '../data';

const foldersList = folders.map(folder => {
	return folder.name;
});

export default defineNuxtRouteMiddleware((to, from) => {
	if (!foldersList.includes(to.params.details.toString())) {
		return navigateTo('/');
	}
});
