module.exports = {
  base: '/front-end-interview-guide/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '面试指南',
      description: ''
    }
  },
  themeConfig: {
    sidebarDepth: 3,
    nav: [
      {
        text: '前端',
        link: '/front-end/'
      },
      {
        text: '面试技巧',
        link: '/career-plan/'
      },
      {
        text: '计算机基础',
        link: '/calculation/'
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
        'JS',
        'Browser',
        'CSS',
        'frame',
        'FNEngineering',
        'performance',
        'http',
        'safe',
        'designPattern',
        'node',
        'recommend',
      ],
      '/career-plan/': [
        '',
        '01',
        '02',
      ],
      '/calculation/': [
        '',
        '01',
      ],
      '/interview-questions/': [
        '',
        '01',
        '02',
        '03',
        '04',
        '05',
      ],
      '/': [
        '',
      ]
    },
  }
}
