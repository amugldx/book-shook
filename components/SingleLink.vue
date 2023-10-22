<script setup lang="ts">
	import { twMerge } from 'tailwind-merge';
	const store = useLinkStore();
	const { renameLink, deleteLink } = store;

	const { linkName, link, folderBg, id } = defineProps<{
		linkName: string;
		link: string;
		folderBg?: string;
		id: string;
	}>();

	const emit = defineEmits(['sumbitRenamedLink']);

	const openModal = ref<boolean>(false);
	const nameInputValue = ref<string>(linkName);
	const linkInputValue = ref<string>(link);

	async function submitRenamedLinkHandler() {
		if (nameInputValue.value && linkInputValue.value) {
			await renameLink(id, nameInputValue.value, linkInputValue.value);
			openModal.value = false;
		}
	}

	async function onDeleteLink() {
		await deleteLink(id);
	}
</script>

<template>
	<div
		class="grid w-40 transition-all border-2 rounded-lg grid-rows-12 h-60 dark:border-background-50 border-text-900 hover:shadow-lg">
		<NuxtLink
			:to="link"
			target="_blank"
			:class="
				twMerge(
					'p-3 font-bold text-base  rounded-t-md bg-primary-50 row-span-6 border-b-2 dark:border-background-50 border-text-900 hover:cursor-pointer',
					folderBg,
				)
			">
			<!-- max words 50 -->
			<p class="break-all line-clamp-4">
				{{ linkName }}
			</p>
		</NuxtLink>
		<NuxtLink
			:to="link"
			target="_blank"
			class="flex items-center row-span-3 px-2 text-xs text-center transition-all border-b-2 cursor-pointer text-text-900 dark:text-text-50 md:text-sm dark:border-background-50 border-text-900">
			<p class="break-all line-clamp-2">{{ link }}</p>
		</NuxtLink>
		<div class="flex items-center justify-around row-span-3">
			<UiButton
				@handle-click="openModal = true"
				intent="secondary"
				size="icon"
				><Icon
					name="solar:pen-outline"
					size="20px"
			/></UiButton>
			<UiButton
				@handle-click="onDeleteLink"
				intent="accent"
				size="icon"
				><Icon
					name="solar:trash-bin-minimalistic-outline"
					size="20px"
			/></UiButton>
		</div>
	</div>
	<Transition
		name="custom-classes"
		enter-active-class="animate__animated animate__fadeIn animate__faster"
		leave-active-class="animate__animated animate__fadeOut animate__faster"
		mode="out-in">
		<UiModal
			@close-modal="openModal = false"
			v-if="openModal">
			<template #header>
				<h3 class="text-lg font-bold md:text-xl lg:text-2xl text-text-900 dark:text-text-50"
					>Add New Link</h3
				>
			</template>
			<template #default>
				<div class="space-y-4">
					<UiInput
						label="Name"
						:focus="true"
						v-model="nameInputValue" />
					<UiInput
						label="Link"
						v-model="linkInputValue" />
				</div>
			</template>
			<template #footer>
				<UiButton
					@click="submitRenamedLinkHandler"
					intent="accent"
					size="large">
					Submit
				</UiButton>
			</template>
		</UiModal>
	</Transition>
</template>
