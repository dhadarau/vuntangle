module.exports = {
  title: 'VUntangle',
  description: 'Untangle Vue & Vuetify based UI library',
  host: '0.0.0.0',
  port: 9090,
  base: '/vuntangle/',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // logo: '/untangle-logo.svg',
    // nav: [
    //   { text: 'Getting Started', link: '/guide/getting-started/' },
    //   { text: 'API', link: '/api/' },
    // ],
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        children: [
          ['/introduction/about','About'],
          ['/introduction/resources','Resources']
        ]
      },
      {
        title: 'Guide',
        collapsable: false,
        children: [
          ['/guide/getting-started','Getting Started'],
          ['/guide/ut-instance','$ut instance']
        ]
      },
      {
        title: 'Instances',
        path: '/instances/',
        collapsable: false,
        children: [
          ['/instances/dialog','$ut.dialog'],
          ['/instances/confirm','$ut.confirm'],
          ['/instances/toast','$ut.toast'],
        ]
      },
      {
        title: 'Other Components',
        path: '/other-components/',
      }
    ]
  },
}
