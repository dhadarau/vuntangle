import UDialog from '@/components/UDialog'
import UConfirm from '@/components/UConfirm'
import UToast from '@/components/UToast'

import UGrid from '@/components/UGrid'
import UClipboard from '@/components/UClipboard'
import UWidget from '@/components/UWidget'

import '../node_modules/ag-grid-community/dist/styles/ag-grid.css'
import '../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css'

/**
 * The base Vuntangle plugin
 * install is called upon Vue.use()
 */
const Vuntangle = {
  install: function(Vue, options) {
    // if (install.installed && _Vue === Vue) return
    // install.installed = true

    // register components
    Vue.component('UGrid', UGrid)
    Vue.component('UClipboard', UClipboard)
    Vue.component('UWidget', UWidget)

    Vue.ut = {
      // toast: new UtToast(Vue, { ...options }),
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
  },
}

export default Vuntangle
