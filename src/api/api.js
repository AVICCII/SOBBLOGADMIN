import http from './http'

export const success_code = 10000;


//解析token
export const checkToken = () => {
  return http.requestGet('/user/check-token')
};

//登录
export const doLogin = (verifyCode,verifyKey,User) => {
    return http.requestPost('/user/login/' + verifyCode + '/' + verifyKey,User)
};

//获取分类列表
export const listCategories = () => {
    return http.requestGet('/admin/category/list')
};

//删除分类列表
export const deleteCategoryById = (categoryId) => {
    return http.requestDelete('/admin/category/'+categoryId)
};

//添加分类列表
export const postCategory = (category) => {
    return http.requestPost('/admin/category/',category)
};

//更新分类列表
export const updateCategory = (categoryId,category) => {
    return http.requestPut('/admin/category/'+categoryId,category)
};

//获取轮播图列表
export const listLoop = () => {
    return http.requestGet('/admin/loop/list')
};