<!-- 递归文件夹组件 -->
<template>
  <div class="folder" v-if="folder.type === 'folder'">
    <div class="folder-header" @click="toggleFolder">
      <span class="folder-icon">
        <i class="mdui-icon material-icons">{{ isOpen ? 'folder_open' : 'folder' }}</i>
      </span>
      {{ folder.title }}
    </div>
    <div v-if="isOpen" class="folder-contents">
      <div v-for="item in items" :key="item.path">
        <FolderTree
          v-if="item.type === 'folder'"
          :folder="item"
          @select-article="handleItemClick"
        />
        <div 
          v-else 
          class="file"
          @click="handleItemClick(item)"
        >
          <span class="file-icon">
            <i class="mdui-icon material-icons">description</i>
          </span>
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
  <div v-else class="file">
    <!-- 文件 -->
    <div class="file-header">
      <span class="file-icon">
        <i class="mdui-icon material-icons">insert_drive_file</i>
      </span>
      {{ folder.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { articleService } from '../services/articleService';

const props = defineProps({
  folder: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['select-article']);

const isOpen = ref(false);
const items = ref([]);

const toggleFolder = async () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && items.value.length === 0) {
    try {
      const contents = await articleService.getFolderContents(props.folder.path);
      items.value = contents;
    } catch (error) {
      console.error('Error fetching folder contents:', error);
    }
  }
};

const handleItemClick = (item) => {
  if (item.type === 'article') {
    emit('select-article', item);
  }
};
</script>

<style scoped>
.folder {
  padding-left: 20px;
}

.folder-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 0;
}

.folder-header:hover {
  background-color: var(--vscode-list-hoverBackground);
}

.folder-icon {
  margin-right: 4px;
}

.file {
  display: flex;
  align-items: center;
  padding: 4px 0;
  padding-left: 20px;
  cursor: pointer;
}

.file:hover {
  background-color: var(--vscode-list-hoverBackground);
}

.file-icon {
  margin-right: 4px;
}
</style>
