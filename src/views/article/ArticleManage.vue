<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ArticleChannelSelect from './components/ArticleChannelSelect.vue'
import { artGetArticleListService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'

const tableData = ref([])
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const total = ref(0)
const loading = ref(false)

const handleDel = (row) => {
  console.log(row)
}

const handleEdit = (row) => {
  console.log(row)
}

const getArticleList = async () => {
  loading.value = true
  const res = await artGetArticleListService(params.value)
  tableData.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

const reset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getArticleList()
}

const handleSizeChange = (size) => {
  params.value.pagesize = size
  params.value.pagenum = 1
  getArticleList()
}

const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

getArticleList()
</script>

<template>
  <page-container title="文章管理">
    <!-- 头部区域 -->
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:">
        <article-channel-select
          style="width: 215px"
          v-model="params.cate_id"
        ></article-channel-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select style="width: 215px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getArticleList()">搜索</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <div style="flex: 1">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column label="文章标题" prop="title" width="400">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">{{ row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发布时间" prop="pub_date">
          <template #default="{ row }">
            {{ formatTime(row.pub_date) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              circle
              plain
              :icon="Edit"
              @click="handleEdit(row)"
            ></el-button>
            <el-button
              type="danger"
              circle
              plain
              :icon="Delete"
              @click="handleDel(row)"
            ></el-button>
          </template>
        </el-table-column>
        <template #empty>
          <el-empty description="当前没有数据……" />
        </template>
      </el-table>
    </div>
    <!-- 分页条区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
