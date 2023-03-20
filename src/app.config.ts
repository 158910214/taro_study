export default defineAppConfig({
  pages: [
    'pages/index/index', // 第一项默认主页
    'pages/todo-list/index',
    'pages/chat/index',
    'pages/table/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
