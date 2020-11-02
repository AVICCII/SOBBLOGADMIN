import http from './http'

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