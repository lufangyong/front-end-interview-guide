module.exports = {
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '面试指南',
      description: ''
    }
  },
  themeConfig: {
    sidebarDepth: 3,
    nav: [{
        text: '指南',
        link: '/'
      },
      {
        text: '前端',
        link: '/front-end/'
      },
      {
        text: '职业规划',
        link: '/career-plan/'
      },
      {
        text: '算法',
        link: '/calculation/'
      },
      {
        text: '性能安全',
        link: '/safe/'
      },
      {
        text: '面试题',
        link: '/interview-questions/'
      },
      {
        text: 'Github',
        link: 'https://github.com/lufangyong'
      }
    ],
    sidebar: {
      '/front-end/': [
        '',
      ],
      '/career-plan/': [
        '',
      ],
      '/calculation/': [
        '',
      ],
      '/safe/': [
        '',
      ],
      '/interview-questions/': [
        '',
        '01',
      ],
      '/': [
        '',
      ]
    },
  }
}