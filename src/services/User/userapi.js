// @ts-ignore

/* eslint-disable */
// import { request } from 'umi';
import request from '@/utils/request';

/**
 * 获取用户 AccessToken
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function accessToken(params, options) {
  let datas = {
    username: params.username,
    password: params.password,
    client_id: '1000001',
    client_secret: '21232f297a57a5a743894a0e4a801fc3',
    scope: 'all offline_access',
    grant_type: 'password',
  };
  return request('/oauth/token', {
    method: 'POST',
    /*headers: {
      'Content-Type': 'multipart/form-data',
      boundary: '---------------------------7d33a816d302b6',
    },*/
    data: datas,
    requestType: 'form', //加个这个，就可以了
    ...(options || {}),
  });
}

/**
 * 获取用户信息
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function currentUser(params, options) {
  let datas = {
    name: params.username,
  };
  return request('/HLHT_WEB/user/getUserInfo', {
    method: 'POST',
    //params: { ...datas },
    data: JSON.stringify(datas),
    requestType: 'application/json',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 获取用户菜单列表
 * @param { *} params
 * @param {*} options
 * @returns
 */
export async function fetchMenuData(params, options) {
  return request('/HLHT_WEB/menu/sysMenuList', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
