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

//添加轮播图列表
export const postLoop = (Looper) => {
    return http.requestPost('/admin/loop',Looper)
};

//删除轮播图
export const deleteLoop = (LooperId) => {
    return http.requestDelete('/admin/loop/'+LooperId)
};

//更新分类列表
export const updateLooper = (LooperId,Looper) => {
    return http.requestPut('/admin/loop/'+LooperId,Looper)
};

//更新分类列表
export const listUsers = (page,size) => {
    return http.requestGet('/user/list?page='+page+'&size='+size)
};

//删除分类列表
export const deleteUserById = (userId) => {
    return http.requestDelete('/user/'+userId)
};

//获取邮箱验证码
export const getVerifyCode = (emailAddress,type) => {
    return http.requestGet('/user/verify_code?email='+emailAddress+'&type='+type);
};