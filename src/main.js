import UDialog from '@/components/UDialog'
import UConfirm from '@/components/UConfirm'
import UToast from '@/components/UToast'

import UGrid from '@/components/UGrid'
import UClipboard from '@/components/UClipboard'
import UWidget from '@/components/UWidget'

import '../node_modules/ag-grid-community/dist/styles/ag-grid.css'
import '../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css'

export let _Vue

/**
 * The base Vuntangle plugin install which is called upon Vue.use()
 */
export default function install(Vue, options) {
  if (install.installed && _Vue === Vue) {
    console.warn('already installed.')
    return
  }
  install.installed = true

  _Vue = Vue

  // register components
  Vue.component('UGrid', UGrid)
  Vue.component('UClipboard', UClipboard)
  Vue.component('UWidget', UWidget)

  Vue.ut = {
    dialog: new UDialog(Vue, { ...options }),
    confirm: new UConfirm(Vue, { ...options }),
    toast: new UToast(Vue, { ...options }),
  }
  Object.defineProperties(Vue.prototype, {
    $ut: {
      get() {
        return Vue.ut
      },
    },
  })
}
