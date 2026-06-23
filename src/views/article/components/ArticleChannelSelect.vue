<script setup>
import { ref } from 'vue'
import { artGetArticleChannelListService } from '@/api/article'

const articleList = ref([])

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const emit = defineEmits(['update:modelValue'])

const getArticelChannelList = async () => {
  const res = await artGetArticleChannelListService()
  articleList.value = res.data.data
}

getArticelChannelList()
</script>

<template>
  <el-select
    placeholder="请选择"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in articleList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
