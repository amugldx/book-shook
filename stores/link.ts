import { defineStore } from 'pinia';
import type { Link } from '~/types/link';

export const useLinkStore = defineStore('link', () => {
	const links = ref<Link[]>();

	async function fetchAllLinks(folderId: string) {
		const { data } = await useFetch<Link[]>('/api/link/alllinks', {
			method: 'POST',
			body: {
				folderId,
			},
		});
		if (data.value) {
			links.value = data.value;
		}
	}

	async function addNewLink(name: string, url: string, folderId: string) {
		const { data } = await useFetch<Link>('/api/link', {
			method: 'POST',
			body: {
				name,
				url,
				folderId,
			},
		});
		if (data.value) {
			links.value?.push(data.value);
		}
	}

	async function renameLink(id: string, name: string, url: string) {
		const { data } = await useFetch<Link>('/api/link', {
			method: 'PATCH',
			body: {
				id,
				name,
				url,
			},
		});
		if (data.value) {
			const newLinks = links.value?.map(link => {
				if (link.id === id) {
					return {
						...link,
						name: name,
						url: url,
					};
				} else {
					return link;
				}
			});
			links.value = newLinks;
		}
	}

	async function deleteLink(id: string) {
		const { data } = await useFetch('/api/link', {
			method: 'DELETE',
			body: {
				id,
			},
		});
		if (data.value) {
			const newLinks = links.value?.filter(link => link.id !== id);
			links.value = newLinks;
		}
	}

	return {
		links,
		fetchAllLinks,
		addNewLink,
		renameLink,
		deleteLink,
	};
});
