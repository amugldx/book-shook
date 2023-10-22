import { defineStore } from 'pinia';
import { Folder } from '~/types/folder';

export const useFolderStore = defineStore('folder', () => {
	const folders = ref<Folder[]>();
	const currentFolder = ref<Folder>();

	async function fetchAllFolders() {
		const { data } = await useFetch<Folder[]>('/api/folder');
		if (data.value) {
			folders.value = data.value;
		}
	}

	async function addNewFolder(folderName: string) {
		const { data } = await useFetch<Folder>('/api/folder', {
			method: 'POST',
			body: {
				name: folderName,
			},
		});
		if (data.value) {
			folders.value?.push(data.value);
		}
	}

	async function renameFolder(folderId: string, folderName: string) {
		const { data } = await useFetch<Folder>('/api/folder', {
			method: 'PATCH',
			body: {
				id: folderId,
				name: folderName,
			},
		});
		if (data.value && currentFolder.value) {
			const newFolders = folders.value?.map(folder => {
				if (folder.id === folderId) {
					return {
						...folder,
						name: folderName,
					};
				} else {
					return folder;
				}
			});

			folders.value = newFolders;
			currentFolder.value.name = folderName;
		}
	}

	async function deleteFolder(folderId: string) {
		const { data } = await useFetch('/api/folder', {
			method: 'DELETE',
			body: {
				id: folderId,
			},
		});
		if (data.value) {
			const newFolders = folders.value?.filter(folder => folder.id !== folderId);
			folders.value = newFolders;
		}
	}

	function setCurrentFolder(folder: Folder) {
		currentFolder.value = folder;
	}

	return {
		folders,
		fetchAllFolders,
		addNewFolder,
		currentFolder,
		setCurrentFolder,
		renameFolder,
		deleteFolder,
	};
});
