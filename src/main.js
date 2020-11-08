import UDialog from '@/components/UDialog'
import UConfirm from '@/components/UConfirm'
import UToast from '@/components/UToast'

/**
 * The base Vuntangle plugin
 * install is called upon Vue.use()
 */
const Vuntangle = {
  install: function(Vue, options) {
    // if (install.installed && _Vue === Vue) return
    // install.installed = true

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
