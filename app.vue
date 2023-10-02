<template>
	<NuxtLayout>
		<NuxtPage
			:transition="{
				enterActiveClass: 'animate__animated animate__fadeIn animate__faster',
				leaveActiveClass: 'animate__animated animate__fadeOut animate__faster',
				mode: 'out-in',
			}" />
	</NuxtLayout>
</template>
