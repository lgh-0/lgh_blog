<!-- EXPLORER状态栏 -->
<template>
  <!-- 侧边栏主容器 -->
  <div class="sidebar">
    <!-- 包含文件夹部分 -->
    <div class="section">
      <!-- 顶部标题栏 -->
      <div class="section-header" @click="toggleSection(sections)">
        <span class="section-icon">
          <i class="mdui-icon material-icons">{{ sections.open ? 'expand_more' : 'chevron_right' }}</i>
        </span>
        <span class="section-title">{{ sections.name }}</span>
        <span class="section-actions">
          <i class="mdui-icon material-icons action-icon" @click.stop="collapseAll">layers</i>
        </span>
      </div>
      <!-- 文件夹树结构 -->
      <div v-if="sections.open" class="section-content">
        <FolderTree
          v-for="folder in sections.content"
          :key="folder.name"
          :folder="folder"
          @toggle="toggleFolder"
          @select-article="handleArticleSelect"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FolderTree from './FolderTree.vue'

const emit = defineEmits(['openFile', 'open-article'])

// 获取文件夹图标
const getFolderIcon = (folder) => {
  if (folder.type === 'folder') {
    return folder.open ? 'folder_open' : 'folder'
  }
  return 'description'
}

// 切换章节展开状态
const toggleSection = (section) => {
  section.open = !section.open
}

// 切换文件夹展开状态
const toggleFolder = (folder) => {
  folder.open = !folder.open
}

// 折叠所有文件夹
const collapseAll = () => {
  const collapseFolder = (folder) => {
    folder.open = false
    if (folder.items) {
      folder.items.forEach(collapseFolder)
    }
  }
  sections.value.content.forEach(collapseFolder)
}

// 打开文件
const openFile = (file) => {
  emit('openFile', file)
}

// 定义侧边栏数据结构
const sections = ref(
  {
    name: 'EXPLORER',
    open: true,
    content: [
      {
        name: '一、数学基础',
        type: 'folder',
        open: false,
        items: [
          { name: '1.1 线性代数', type: 'folder', open: false, items: [] },
          { name: '1.2 微积分', type: 'folder', open: false, items: [] },
          { name: '1.3 概率论与数理统计', type: 'folder', open: false, items: [] },
          { name: '1.4 离散数学', type: 'folder', open: false, items: [] },
          { name: '1.5 计算理论', type: 'folder', open: false, items: [] },
          { name: '1.6 高级数学', type: 'folder', open: false, items: [] }
        ]
      },
      {
        name: '二、核心系统',
        type: 'folder',
        open: false,
        items: [
          { name: '2.1 计算机体系结构', type: 'folder', open: false, items: [] },
          { name: '2.2 操作系统', type: 'folder', open: false, items: [] },
          { name: '2.3 网络技术', type: 'folder', open: false, items: [] },
          { name: '2.4 存储系统', type: 'folder', open: false, items: [] },
          { name: '2.5 云计算', type: 'folder', open: false, items: [] }
        ]
      },
      {
        name: '三、软件开发',
        type: 'folder',
        open: false,
        items: [
          {
            name: '3.1 编程语言',
            type: 'folder',
            open: false,
            items: [
              { name: '3.1.1 C/C++', type: 'folder', open: false, items: [] },
              { name: '3.1.2 Java', type: 'folder', open: false, items: [] },
              { name: '3.1.3 解释型语言', type: 'folder', open: false, items: [] },
            ]
          },
          { // 入门 基础 进阶 进阶数学
            name: '3.2 数据结构与算法',
            type: 'folder',
            open: false,
            items: [
              {
                name: '3.2.1 入门篇',
                type: 'folder',
                open: false,
                items: [
                  { name: '3.2.1.1 枚举', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.2 模拟', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.3 递归', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.4 前缀和和差分', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.5 尺取法', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.6 排序算法原理的理解', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.7 二分，三分', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.8 分治', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.9 贪心', type: 'folder', open: false, items: [] },
                  { name: '3.2.1.10 简单搜索', type: 'folder', open: false, items: [] }
                ]
              },
              {
                name: '3.2.2 基础篇',
                type: 'folder',
                open: false,
                items: [
                  {
                    name: '3.2.2.1基础数据结构',
                    type: 'folder',
                    open: false,
                    items: [
                      { name: '1 栈', type: 'folder', open: false, items: [] },
                      { name: '2 队列', type: 'folder', open: false, items: [] },
                      { name: '3 链表', type: 'folder', open: false, items: [] },
                      { name: '4 堆或优先队列', type: 'folder', open: false, items: [] },
                      { name: '5 HASH表', type: 'folder', open: false, items: [] },
                      { name: '6 二叉树', type: 'folder', open: false, items: [] },
                      { name: '7 Trie树', type: 'folder', open: false, items: [] },
                      { name: '8 set和map的用法', type: 'folder', open: false, items: [] },
                      { name: '9 并查集', type: 'folder', open: false, items: [] },
                      { name: '10 KMP算法', type: 'folder', open: false, items: [] },
                      { name: '11 单调栈', type: 'folder', open: false, items: [] },
                      { name: '12 树状数组', type: 'folder', open: false, items: [] },
                      { name: '13 线段树', type: 'folder', open: false, items: [] }
                    ]
                  },
                  {
                    name: '3.2.2.2基础动态规划',
                    type: 'folder',
                    open: false,
                    items: [
                      { name: '1 路径搜索dp', type: 'folder', open: false, items: [] },
                      { name: '2 背包dp', type: 'folder', open: false, items: [] },
                      { name: '3 区间dp', type: 'folder', open: false, items: [] },
                      { name: '4 树形dp', type: 'folder', open: false, items: [] },
                      { name: '5 状态压缩dp', type: 'folder', open: false, items: [] },
                      { name: '6 概率dp', type: 'folder', open: false, items: [] }
                    ]
                  },
                  {
                    name: '3.2.2.3基础图论',
                    type: 'folder',
                    open: false,
                    items: [
                      {name: '1 邻接矩阵', type: 'folder', open: false, items: [] },
                      {name: '2 用dfs和bfs遍历整个图', type: 'folder', open: false, items: [] },
                      {name: '3 欧拉回路', type: 'folder', open: false, items: [] },
                      {name: '4 三种最短路算法(Floyd-Dijkstra-SPFA)', type: 'folder', open: false, items: [] },
                      {name: '5 拓扑排序', type: 'folder', open: false, items: [] },
                      {name: '6 两种最小生成树(Prim-Kruskal)', type: 'folder', open: false, items: [] },
                    ]
                  },
                  {
                    name: '3.2.2.4基础数学',
                    type: 'folder',
                    open: false,
                    items: [
                      { name: '1 位运算', type: 'folder', open: false, items: [] },
                      { name: '2 快速幂', type: 'folder', open: false, items: [] },
                      { name: '3 线性素数筛(埃式筛-欧拉筛)', type: 'folder', open: false, items: [] },
                      { name: '4 高精度加减乘除', type: 'folder', open: false, items: [] },
                      { name: '5 组合数学(鸽巢原理-容斥原理等)', type: 'folder', open: false, items: [] },
                      { name: '6 矩阵快速幂', type: 'folder', open: false, items: [] },
                      { name: '7 gcd和lcm和exgcd(扩展欧几里得算法)', type: 'folder', open: false, items: [] },
                      { name: '8 费马小定理', type: 'folder', open: false, items: [] },
                      { name: '9 乘法逆元', type: 'folder', open: false, items: [] },
                    ]
                  }
                ]
              },
              {
                name: '3.2.3 进阶篇',
                type: 'folder',
                open: false,
                items: [
                  { 
                    name: '3.2.3.1 进阶数据结构', 
                    type: 'folder', 
                    open: false, 
                    items: [
                      {name: '1 点分治', type: 'folder', open: false, items: [] },
                      {name: '2 二叉查找树(Treap-spaly)', type: 'folder', open: false, items: [] },
                      {name: '3.AC自动机', type: 'folder', open: false, items: [] },
                      {name: '4 后缀数组和后缀自动机', type: 'folder', open: false, items: [] },
                      {name: '5 扩展KMP', type: 'folder', open: false, items: [] },
                      {name: '6 回文树', type: 'folder', open: false, items: [] },
                      {name: '7 A算法和IDA算法', type: 'folder', open: false, items: [] },
                      {name: '8 双向BFS', type: 'folder', open: false, items: [] },
                      {name: '9 AVL树和替罪羊树', type: 'folder', open: false, items: [] },
                      {name: '10 红黑树', type: 'folder', open: false, items: [] },
                      {name: '11 树链剖分', type: 'folder', open: false, items: [] },
                      {name: '12 最近公共祖先(LCA)', type: 'folder', open: false, items: [] },
                      {name: '13 树上启发式合并(dsu-on-tree)', type: 'folder', open: false, items: [] },
                      {name: '14 哈夫曼树', type: 'folder', open: false, items: [] },
                      {name: '15 ST表', type: 'folder', open: false, items: [] },
                      {name: '16 主席树', type: 'folder', open: false, items: [] },
                      {name: '17 划分树', type: 'folder', open: false, items: [] },
                      {name: '18 莫队算法', type: 'folder', open: false, items: [] },
                      {name: '19 树套树', type: 'folder', open: false, items: [] },
                    ] 
                  },
                  { 
                    name: '3.2.3.2 进阶动态规划', 
                    type: 'folder', 
                    open: false, 
                    items: [
                      {name: '1.DAG上dp', type: 'folder', open: false, items: [] },
                      {name: '2.数位dp', type: 'folder', open: false, items: [] },
                      {name: '3.计数dp', type: 'folder', open: false, items: [] },
                      {name: '4.动态dp', type: 'folder', open: false, items: [] },
                      {name: '5.插头dp', type: 'folder', open: false, items: [] },
                      {name: '6.用单调队列或单调栈优化的dp', type: 'folder', open: false, items: [] },
                      {name: '7.斜率优化dp', type: 'folder', open: false, items: [] },
                      {name: '8.四边形不等式优化dp', type: 'folder', open: false, items: [] },
                      {name: '9.树上dp', type: 'folder', open: false, items: [] },
                    ] 
                  },
                  { 
                    name: '3.2.3.3 进阶图论', 
                    type: 'folder', 
                    open: false, 
                    items: [
                      {name: '1 k短路', type: 'folder', open: false, items: [] },
                      {name: '2 强连通分量', type: 'folder', open: false, items: [] },
                      {name: '3 割点和桥', type: 'folder', open: false, items: [] },
                      {name: '4 二分图匹配', type: 'folder', open: false, items: [] },
                      {name: '5 2-SAT', type: 'folder', open: false, items: [] },
                      {name: '6 基环树', type: 'folder', open: false, items: [] },
                      {name: '7 图的着色', type: 'folder', open: false, items: [] },
                      {name: '8 最大流', type: 'folder', open: false, items: [] },
                      {name: '9 最小割', type: 'folder', open: false, items: [] },
                      {name: '10 费用流', type: 'folder', open: false, items: [] },
                      {name: '11 哈密顿图和哈密顿回路', type: 'folder', open: false, items: [] },
                      {name: '12 弦图', type: 'folder', open: false, items: [] },
                    ] 
                  },
                  {
                    name: '3.2.3.4 进阶数学',
                    type: 'folder',
                    open: false,
                    items: [
                      { name: '1 数学部分', 
                      type: 'folder', 
                      open: false, 
                      items: [
                          { name: '1 线性同余方程', type: 'folder', open: false, items: [] },
                          { name: '2 中国剩余定理', type: 'folder', open: false, items: [] },
                          { name: '3 二次剩余', type: 'folder', open: false, items: [] },
                          { name: '4 卢卡斯定理', type: 'folder', open: false, items: [] },
                          { name: '5 杜教筛', type: 'folder', open: false, items: [] },
                          { name: '6 莫比乌斯反演', type: 'folder', open: false, items: [] },
                          { name: '7.Min——25筛', type: 'folder', open: false, items: [] },
                          { name: '8 原根', type: 'folder', open: false, items: [] },
                          { name: '9 拉格朗日插值', type: 'folder', open: false, items: [] },
                          { name: '10 快速傅里叶变换', type: 'folder', open: false, items: [] },
                          { name: '11 快速数论变换', type: 'folder', open: false, items: [] },
                          { name: '12 多项式变化', type: 'folder', open: false, items: [] },
                          { name: '13 牛顿迭代', type: 'folder', open: false, items: [] },
                          { name: '14.高斯消元', type: 'folder', open: false, items: [] },
                          { name: '15 调和', type: 'folder', open: false, items: [] },
                          { name: '16 构造', type: 'folder', open: false, items: [] },
                          { name: '17 线性规划', type: 'folder', open: false, items: [] },
                          { name: '18 多项式求根', type: 'folder', open: false, items: [] },
                          { name: '19 母函数', type: 'folder', open: false, items: [] },
                          { name: '20 群论', type: 'folder', open: false, items: [] },
                          { name: '21 定积分的求解', type: 'folder', open: false, items: [] },
                      ] 
                    },
                      { name: '2 计算几何部分', 
                      type: 'folder', 
                      open: false, 
                      items: [
                        { name: '1 叉乘点乘', type: 'folder', open: false, items: [] },
                        { name: '2 坐标离散化', type: 'folder', open: false, items: [] },
                        { name: '3 求线段交点', type: 'folder', open: false, items: [] },
                        { name: '4 欧式距离-曼哈顿距离-切比雪夫距离', type: 'folder', open: false, items: [] },
                        { name: '5 皮克定理', type: 'folder', open: false, items: [] },
                        { name: '6 凸包', type: 'folder', open: false, items: [] },
                        { name: '7 扫描线算法', type: 'folder', open: false, items: [] },
                        { name: '8 旋转卡壳', type: 'folder', open: false, items: [] },
                        { name: '9 平面最近点对', type: 'folder', open: false, items: [] },
                        { name: '10 平面几何知识', type: 'folder', open: false, items: [] },
                      ] 
                    },
                      { name: '3 博弈论部分', 
                      type: 'folder', 
                      open: false, 
                      items: [
                        { name: '1 巴什博弈', type: 'folder', open: false, items: [] },
                        { name: '2 威佐夫博弈论', type: 'folder', open: false, items: [] },
                        { name: '3 Nim游戏', type: 'folder', open: false, items: [] },
                        { name: '4 斐波那契博弈', type: 'folder', open: false, items: [] },
                        { name: '5 公平组合博弈', type: 'folder', open: false, items: [] },
                        { name: '6 SG函数', type: 'folder', open: false, items: [] },
                      ] 
                    },
                     
                    ]
                  }
                ]
              }, 
            ]
          },
          { name: '3.3 软件工程', type: 'folder', open: false, items: [] },
          { name: '3.4 DevOps', type: 'folder', open: false, items: [] },
          { name: '3.5 软件测试', type: 'folder', open: false, items: [] },
          { name: '3.6 编译原理', type: 'folder', open: false, items: [] }
        ]
      },
      {
        name: '四、数据技术',
        type: 'folder',
        open: false,
        items: [
          {
            name: '4.1 数据库',
            type: 'folder',
            open: false,
            items: [
              { name: '4.1.1 关系型数据库', type: 'folder', open: false, items: [] },
              { name: '4.1.2 NoSQL数据库', type: 'folder', open: false, items: [] },
              { name: '4.1.3 分布式数据库', type: 'folder', open: false, items: [] }
            ]
          },
          { name: '4.2 大数据', type: 'folder', open: false, items: [] }
        ]
      },
      {
        name: '五、人工智能',
        type: 'folder',
        open: false,
        items: [
          { name: '5.1 机器学习', type: 'folder', open: false, items: [] },
          { name: '5.2 深度学习', type: 'folder', open: false, items: [] },
          { name: '5.3 自然语言处理', type: 'folder', open: false, items: [] },
          { name: '5.4 计算机视觉', type: 'folder', open: false, items: [] }
        ]
      },
      {
        name: '六、现代应用',
        type: 'folder',
        open: false,
        items: [
          { name: '6.1 Web技术', type: 'folder', open: false, items: [] },
          {
            name: '6.2 前端',
            type: 'folder',
            open: false,
            items: [
              { name: '6.2.1 前端3件套', type: 'folder', open: false, items: [] },
              { name: '6.2.2 vue', type: 'folder', open: false, items: [] },
              { name: '6.2.3 react', type: 'folder', open: false, items: [] }
            ]
          },
          {
            name: '6.3 后端',
            type: 'folder',
            open: false,
            items: [
              { name: '6.3.1 Spring', type: 'folder', open: false, items: [] },
              { name: '6.3.2 Django', type: 'folder', open: false, items: [] },
              { name: '6.3.3 Flask', type: 'folder', open: false, items: [] },
              { name: '6.3.4 Node.js', type: 'folder', open: false, items: [] }
            ]
          },
          { name: '6.4 移动开发', type: 'folder', open: false, items: [] }
        ]
      },
      {
        name: '七、安全',
        type: 'folder',
        open: false,
        items: [
          { name: '7.1 网络安全', type: 'folder', open: false, items: [] },
          { name: '7.2 系统安全', type: 'folder', open: false, items: [] }
        ]
      },
      {
        name: '八、专业应用',
        type: 'folder',
        open: false,
        items: [
          { name: '8.1 图形学', type: 'folder', open: false, items: [] },
          {
            name: '8.2 游戏开发',
            type: 'folder',
            open: false,
            items: [
              { name: '8.2.1 游戏引擎', type: 'folder', open: false, items: [] }
            ]
          },
          { name: '8.3 嵌入式', type: 'folder', open: false, items: [] }
        ]
      },
      {
        name: '九、新兴技术',
        type: 'folder',
        open: false,
        items: [
          { name: '9.1 区块链', type: 'folder', open: false, items: [] },
          
        ]
      },
      {
        name: '十、过程博客',
        type: 'folder',
        open: false,
        items: [
        ]
      },
      {
        name: '十一、工具',
        type: 'folder',
        open: false,
        items: [
        ]
      }
    ]
  }
)

const handleArticleSelect = (article) => {
  if (article && article.content) {
    emit('open-article', {
      name: article.title,
      content: article.content,
      path: article.path
    });
  }
};
</script>

<style scoped>
.sidebar {
  width: 270px;
  background-color: #252526;
  height: calc(100vh - 50px);
  overflow-y: auto;
  color: #cccccc;
  position: relative;
}

.sidebar::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background-color: #1e1e1e;
  box-shadow: 1px 0 0 rgba(0, 0, 0, 0.5);
}

.section-header {
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: #cccccc;
}

.section-icon {
  display: flex;
  align-items: center;
  margin-right: 4px;
  min-width: 16px;
}

.section-icon i {
  font-size: 16px;
}

.section-title {
  flex-grow: 1;
}

.section-actions {
  opacity: 0;
  transition: opacity 0.2s;
}

.section-header:hover .section-actions {
  opacity: 1;
}

.action-icon {
  font-size: 16px;
  cursor: pointer;
  padding: 2px;
  border-radius: 3px;
}

.action-icon:hover {
  background-color: #2a2d2e;
}

.folder-header {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  color: #cccccc;
}

.folder-header:hover {
  background-color: #2a2d2e;
}

.folder-icon {
  display: flex;
  align-items: center;
  margin-right: 4px;
  min-width: 16px;
}

.folder-icon i {
  font-size: 16px;
  color: #dcb67a;
  /* Windows 文件夹颜色 */
}

.folder-contents {
  margin-left: 16px;
}

/* 自定义滚动条样式 */
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #4f4f4f;
}
</style>
