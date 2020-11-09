module.exports = {
  title: 'VUntangle',
  description: 'Untangle Vue & Vuetify based UI library',
  host: '0.0.0.0',
  port: 9090,
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
          ['/guide/introduction','Introduction']
        ]
      },
      {
        title: 'Global Components',
        path: '/global-components/',
        collapsable: false,
        children: [
          ['/global-components/UDialog','UDialog'],
          ['/global-components/UConfirm','UConfirm'],
          ['/global-components/UToast','UToast'],
        ]
      },
      {
        title: 'Other Components',
        path: '/other-components/',
      }
    ]
  },
}
