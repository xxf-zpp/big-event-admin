import request from '@/utils/request'

// 获取文章分类
export const artGetArticleChannelListService = () => {
  return request.get('/my/cate/list')
}
