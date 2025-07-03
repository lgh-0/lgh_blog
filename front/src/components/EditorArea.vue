<!-- 编辑区 -->
<template>
  <div class="editor-area">
    <div class="tabs" v-if="tabs.length > 0">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ active: activeTab === tab.name }"
        @click="activeTab = tab.name"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.name }}
        <!-- 关闭标签的标志× 它是一个 Unicode 字符，用来表示关闭或删除的图标。-->
        <span class="close-tab" @click.stop="closeTab(tab.id)">×</span> 
      </div>
    </div>
    <div class="editor-content">
      <div v-if="activeTab" class="markdown-content">
        <div v-html="renderedContent"></div>
      </div>
      <div v-else class="welcome-content">
        <h1>Welcome to Lgh's blog</h1>
        <p>Select a file from the explorer to start reading</p>
        <div class="tech-stack">
          <span class="tech-icon">⚛️ vue</span>
          <span class="tech-icon">🌐 WordPress</span>
          <span class="tech-icon">📜 JavaScript</span>
          <span class="tech-icon">🦀 Rust</span>
          <span class="tech-icon">🟢 Node.js</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  }
});

const tabs = ref([]) //储存代开的标签，每个标签都是一个对象
const activeTab = ref(null)//存储当前活动的标签

// 文章内容模拟数据库  模板字符串（Template Literal）
const articleContents = {
  'home.jsx': {
    content: `# Welcome to My Blog
    
This is my personal space where I share my thoughts and experiences.

## Recent Posts
- Getting Started with Vue 3
- My Journey in Web Development
- Building a VSCode-themed Blog`,
    type: 'markdown'
  },
  'about.html': {
    content: `# About Me

I'm a software developer passionate about creating beautiful and functional web applications.

## Skills
- Frontend Development
- Vue.js & React
- UI/UX Design`,
    type: 'markdown'
  },
  'projects.js': {
    content: `# My Projects

## VSCode Blog
A personal blog built with Vue 3, styled to look like Visual Studio Code.

## Other Projects
- E-commerce Platform
- Weather App
- Task Management System`,
    type: 'markdown'
  }
}

const openFile = (file) => {
  // 检查文件是否已经打开
  const existingTab = tabs.value.find(tab => tab.name === file.name)
  if (!existingTab) {
    const newTab = {
      id: Date.now(),
      name: file.name,
      icon: file.icon,
      content: articleContents[file.name]?.content || '# File content not found'
    }
    tabs.value.push(newTab)
  }
  activeTab.value = file.name
}

const closeTab = (tabId) => {
  const index = tabs.value.findIndex(tab => tab.id === tabId)
  if (index > -1) {
    // 如果关闭的是当前活动标签，则切换到下一个或上一个标签
    if (tabs.value[index].name === activeTab.value) {
      if (tabs.value.length > 1) {
        if (index === tabs.value.length - 1) {
          activeTab.value = tabs.value[index - 1].name
        } else {
          activeTab.value = tabs.value[index + 1].name
        }
      } else {
        activeTab.value = null
      }
    }
    tabs.value.splice(index, 1)
  }
}

// 当前后动标签的内容
const currentContent = computed(() => {
  const tab = tabs.value.find(tab => tab.name === activeTab.value)
  return tab?.content || ''
})

const renderedContent = computed(() => {
  if (!currentContent.value) return '';
  return md.render(currentContent.value);
})

//defineExpose：用于在 Vue 3 的 <script setup> 中暴露方法，使父组件能够调用 openFile 方法。
defineExpose({
  openFile
})
</script>

<style scoped>
.editor-area {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
}

.tabs {
  display: flex;
  background-color: #252526;
  border-bottom: 1px solid #1e1e1e;
  height: 35px;
  overflow-x: auto;
}

.tabs::-webkit-scrollbar {
  height: 3px;
}

.tabs::-webkit-scrollbar-thumb {
  background-color: #424242;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 13px;
  background-color: #2d2d2d;
  border-right: 1px solid #1e1e1e;
  cursor: pointer;
  min-width: fit-content;
  height: 100%;
}

.tab.active {
  background-color: #1e1e1e;
}

.close-tab {
  margin-left: 8px;
  opacity: 0.6;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.close-tab:hover {
  opacity: 1;
  background-color: #424242;
}

.editor-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.markdown-content {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  white-space: pre-wrap;
}

.welcome-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.welcome-content h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #d4d4d4;
}

.welcome-content p {
  font-size: 1.2em;
  color: #bbbbbb;
  margin-bottom: 40px;
}

.tech-stack {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.tech-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #2d2d2d;
  border-radius: 4px;
  font-size: 1.1em;
}

:deep(.markdown-content h1) {
  color: #d4d4d4;
  border-bottom: 1px solid #1e1e1e;
  padding-bottom: 0.3em;
}

:deep(.markdown-content pre) {
  background-color: #2d2d2d;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
}

:deep(.markdown-content code) {
  font-family: 'Consolas', monospace;
  padding: 0.2em 0.4em;
  background-color: #2d2d2d;
  border-radius: 3px;
}

:deep(.markdown-content img) {
  max-width: 100%;
  height: auto;
}

:deep(.markdown-content blockquote) {
  border-left: 4px solid #1e1e1e;
  padding-left: 1em;
  margin: 1em 0;
  color: #bbbbbb;
}

:deep(.markdown-content table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

:deep(.markdown-content th),
:deep(.markdown-content td) {
  border: 1px solid #1e1e1e;
  padding: 8px;
  text-align: left;
}

:deep(.markdown-content th) {
  background-color: #2d2d2d;
}
</style>
