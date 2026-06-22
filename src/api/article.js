import request from '@/utils/request'

// 获取文章分类
export const artGetArticleChannelListService = () => {
  return request.get('/my/cate/list')
}

// 更新分类
export const artUpdateArticleCategoryService = (obj) => {
  return request.put('/my/cate/info', obj)
}

// 新增分类
export const artAddArticleCategoryService = (obj) => {
  return request.post('/my/cate/add', obj)
}

// 删除分类
export const artDeleteArictleCategoryService = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
