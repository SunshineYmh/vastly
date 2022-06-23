// @ts-ignore

/* eslint-disable */
// import { request } from 'umi';
import request from '@/utils/request';

/**
 * 获取路由信息
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function selectRoute(params, options) {
  // let datas = {
  //   uid: params.uid,
  // };
  return request('/HLHT_WEB/GatewayRoute/selectRoute', {
    method: 'POST',
    //params: { ...datas },
    data: JSON.stringify(params),
    requestType: 'application/json',
    ...(options || {}),
  });
}

/**
 * 路由信息添加
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function insertRoute(params, options) {
  // let datas = {
  //   uid: params.uid,
  // };
  return request('/HLHT_WEB/GatewayRoute/insertRoute', {
    method: 'POST',
    //params: { ...datas },
    data: JSON.stringify(params),
    requestType: 'application/json',
    ...(options || {}),
  });
}

/**
 * 路由信息修改
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function updateRoute(params, options) {
  // let datas = {
  //   uid: params.uid,
  // };
  return request('/HLHT_WEB/GatewayRoute/updateRoute', {
    method: 'POST',
    //params: { ...datas },
    data: JSON.stringify(params),
    requestType: 'application/json',
    ...(options || {}),
  });
}

/**
 * 路由信息删除
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function deletePulsRoute(params, options) {
  let datas = params.params;
  return request('/HLHT_WEB/GatewayRoute/deletePulsRoute', {
    method: 'POST',
    //params: { ...datas },
    data: JSON.stringify(datas),
    requestType: 'application/json',
    ...(options || {}),
  });
}

/**
 * 路由服务同步
 * @param {*} params
 * @param {*} options
 * @returns
 */
export async function routeJkModel(params, options) {
  return request('/HLHT_WEB/swaggerJsonImport/importService', {
    method: 'POST',
    data: JSON.stringify(params),
    requestType: 'application/json',
    ...(options || {}),
  });
}
