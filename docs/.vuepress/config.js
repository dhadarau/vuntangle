module.exports = {
  title: 'Vuntangle',
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
        title: 'Constructors',
        collapsable: false,
        children: [
          ['/constructors/dialog','$ut.dialog'],
          ['/constructors/confirm','$ut.confirm'],
          ['/constructors/toast','$ut.toast'],
        ]
      },
      {
        title: 'Components',
        collapsable: false,
        children: [
          ['/components/u-grid','UGrid'],
          ['/components/u-clipboard','UClipboard'],
          ['/components/u-widget','UWidget'],
        ]
      }
    ]
  },
}
