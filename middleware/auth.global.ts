export default defineNuxtRouteMiddleware((to, from) => {
	const cookies = useCookie('BookShookLogged');

	if (cookies.value && to?.name === 'login') {
		return navigateTo('/');
	}

	if (!cookies.value && to?.name !== 'login') {
		abortNavigation();
		return navigateTo('/login');
	}
});
