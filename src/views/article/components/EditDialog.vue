<script setup>
import { artAddArticleCategoryService, artUpdateArticleCategoryService } from '@/api/article'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const formData = ref({
  cate_name: '',
  cate_alias: ''
})
const formRef = ref()

const emit = defineEmits(['success'])

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}

const open = (row) => {
  dialogVisible.value = true
  formData.value = { ...row }
  console.log(row)
}

const submit = async () => {
  // 表单预校验
  await formRef.value.validate()
  if (formData.value.id) {
    await artUpdateArticleCategoryService(formData.value)
    ElMessage.success('更新分类成功')
  } else {
    await artAddArticleCategoryService(formData.value)
    ElMessage.success('添加分类成功')
  }
  emit('success')
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formData.id ? '编辑分类' : '添加分类'"
    width="450px"
    :before-close="handleClose"
  >
    <el-form :model="formData" ref="formRef" :rules="rules" style="padding: 0 20px">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formData.cate_name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formData.cate_alias" placeholder="请输入别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="((dialogVisible = false), submit())"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
