<template>
  <div class="vscode-container">
    <!-- 顶部导航栏 -->
    <TitleBar />
    <!-- 中间部分 -->
    <div class="main-content">
      <!-- 活动栏 -->
      <ActivityBar @toggle-sidebar="toggleSideBar" />
      
      <!--   EXPLORER栏目 -->
      <SideBar 
        v-show="isSideBarVisible" 
        @open-file="handleFileOpen"
      />
      <!-- 编辑区域 -->
      <EditorArea 
        ref="editorAreaRef"
        :class="{ 'full-width': !isSideBarVisible }" 
      />
    </div>
    <!-- 底部栏 -->
    <StatusBar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TitleBar from './components/TitleBar.vue'
import ActivityBar from './components/ActivityBar.vue'
import SideBar from './components/SideBar.vue'
import EditorArea from './components/EditorArea.vue'
import StatusBar from './components/StatusBar.vue'
// import '@mdui/icons/newspaper.js'
// import '@mdui/icons/search.js'

const isSideBarVisible = ref(true)
const editorAreaRef = ref(null)

const toggleSideBar = () => {
  isSideBarVisible.value = !isSideBarVisible.value
}

const handleFileOpen = (file) => {
  editorAreaRef.value?.openFile(file)
}
</script>

<style scoped>
.vscode-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
  color: #d4d4d4;
}

.main-content {
  flex: 1;
  display: grid;
  grid-template-columns: auto auto 1fr;
  overflow: hidden;
}

.full-width {
  grid-column: 2 / -1;
}
</style>
