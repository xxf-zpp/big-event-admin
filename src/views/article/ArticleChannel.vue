<script setup>
import { artGetArticleChannelListService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const articleList = ref([])
const loading = ref(false)

const getArticleList = async () => {
  loading.value = true
  const res = await artGetArticleChannelListService()
  articleList.value = res.data.data
  loading.value = false
}
getArticleList()

const handleEdit = ($index, row) => {
  console.log($index, row, '当前行数据………………编辑')
}

const handleDelete = ($index, row) => {
  console.log($index, row, '当前行数据………………删除')
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <el-table :data="articleList" width="100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="100px"></el-table-column>
      <el-table-column label="分类名称" property="cate_name"></el-table-column>
      <el-table-column label="分类别名" property="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100px">
        <template #default="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="primary"
            :icon="Edit"
            circle
            plain
          ></el-button>
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            type="danger"
            :icon="Delete"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="当前没有数据……" />
      </template>
    </el-table>
  </page-container>
</template>

<style lang="scss" scoped></style>
