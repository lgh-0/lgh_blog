<!-- 活动栏 -->
<template>
	<div class="activity-bar">
		<div class="top-icons">
			<div
				v-for="icon in icons"
				:key="icon.name"
				class="icon"
				:class="{ active: activeIcon === icon.name }"
				@click="setActive(icon.name)"
			>
				<span class="mdui-icon" :class="icon.icon" :style="{ color: icon.name === 'files' ? '#dcb67a' : '' }"></span>
			</div>
		</div>
		<div class="bottom-icons">
			<div
				v-for="icon in bottomIcons"
				:key="icon.name"
				class="icon"
			>
				<span class="mdui-icon" :class="icon.icon"></span>
			</div>
		</div>
	</div>
</template>


<script setup>
import { ref } from 'vue'

const emit = defineEmits(['toggle-sidebar'])

const icons = [
	{ name: 'files', icon: 'mdi mdi-folder', active: true },
	{ name: 'search', icon: 'mdi mdi-magnify', active: false },
	{ name: 'git', icon: 'mdi mdi-source-branch', active: false },
	{ name: 'extensions', icon: 'mdi mdi-puzzle', active: false },
]

const bottomIcons = [
	{ name: 'profile', icon: 'mdi mdi-account' },
	{ name: 'settings', icon: 'mdi mdi-cog' }
]

const activeIcon = ref('files')

const setActive = (iconName) => {
	activeIcon.value = iconName
	if (iconName === 'files') {
		emit('toggle-sidebar')
	}
}
</script>



<style scoped>
.activity-bar {
	/*  */
	width: 53px; 
	background-color: #333333;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 8px 0;
	height: 100%;
}

.top-icons,
.bottom-icons {
	display: flex;
	flex-direction: column;
	gap: 8px;
	align-items: center;
}

.icon {
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: 0.6;
	transition: opacity 0.2s;
	color: #fff;
}

.icon:hover {
	opacity: 1;
}

.icon.active {
	opacity: 1;
	border-left: 2px solid #fff;
}

.mdui-icon {
	font-size: 24px;
}

.mdi::before {
	font-size: 24px;
}
</style>
