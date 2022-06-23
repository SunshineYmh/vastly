import React, { Component } from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { currentUser as queryCurrentUser, fetchMenuData } from '@/services/User/userapi';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import allIcons from '@@/plugin-antd-icon/icons';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

// 初始化数据
export async function getInitialState() {
  const fetchUserInfo = async (values) => {
    try {
      const msg = await queryCurrentUser({ ...values });
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }

    return undefined;
  }; // 如果是登录页面，不执行

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
}

const toHump = (name) => name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
const formatter = (data) => {
  data.forEach((item) => {
    if (item.icon) {
      const { icon } = item;
      const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
      console.log('--->>>>>>>>>v4IconNamev4IconNamev4IconName====>>>>', v4IconName);
      const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];
      console.log('--->>>>>>>>>NewIcon====>>>>', NewIcon);
      if (NewIcon) {
        try {
          // eslint-disable-next-line no-param-reassign
          item.icon = React.createElement(NewIcon);
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (item.routes || item.children) {
      const children = formatter(item.routes || item.children); // Reduce memory usage

      item.children = children;
    }
  });
  return data;
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState }) => {
  return {
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        uid: initialState?.currentUser?.uid,
      },
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        const menuData = await fetchMenuData({ ...params });
        const meundatalist = formatter(menuData.data);
        console.log('------------------------->>>mmmmm>>>>>>', meundatalist);
        return meundatalist;
      },
    },
    // 自定义头右部的 render 方法
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // 配置水印，水印是 PageContainer 的功能，layout 只是透传给 PageContainer
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    // 可以自定义页脚
    footerRender: () => <Footer />,
    // 页面切换时触发
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // 显示在菜单右下角的快捷操作
    links: isDev
      ? [
          // eslint-disable-next-line react/jsx-key
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          // eslint-disable-next-line react/jsx-key
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    // 自定义的菜单头区域
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
