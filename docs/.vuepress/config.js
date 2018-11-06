module.exports = {
  // base: '/front-end-interview-guide/',
  base: '',
  head: [
    ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./favicon.ico` }]
 ],
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
        text: '前端',
        link: '/front-end/'
      },
      {
        text: '计算机基础',
        link: '/calculation/'
      },
      {
        text: '面试',
        link: '/interview/'
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
        'browser',
        'CSS',
        'frame',
        'FNEngineering',
        'performance',
        'http',
        'safe',
        'design-pattern',
        'node',
        'recommend',
      ],
      '/calculation/': [
        '',
        'data-structure',
        'calculation',
      ],
      '/interview/': [
        '',
        'resume',
        'tricks',
        'common',
        '360',
        'mt-ele',
        'tt',
      ],
      '/career-plan/': [
        '',
        '01',
        '02',
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
