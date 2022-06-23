const Settings = {
  //导航的主题，side 和 mix 模式下是左侧菜单的主题，top 模式下是顶部菜单
  navTheme: 'light', //dark || light ||top || realDark
  // 拂晓蓝 #1890ff
  primaryColor: '#1890ff',
  // top 菜单于顶部展示  mix 菜单于顶部和左侧混合展示，需要注意，
  // 当 mix 模式时，需要添加 splitMenus : true，顶部才可以正确展示一级菜单
  // side 菜单于左侧展示
  layout: 'mix',
  splitMenus: true,
  // layout 的内容模式,Fluid：自适应，Fixed：定宽 1200px
  contentWidth: 'Fluid',
  // 是否固定 header 到顶部
  fixedHeader: true,
  //是否固定导航 固定侧边菜单
  fixSiderbar: true,
  //自动分割菜单
  colorWeak: false,
  // 设置标题的 title
  title: 'Ant Design Pro',
  pwa: false,
  // 修改右上角的 logo
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  //iconfontUrl: '//at.alicdn.com/t/font_1716924_7j5cze0fcd8.js',
};
export default Settings;
