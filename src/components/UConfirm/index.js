import UConfirm from './UConfirm.vue'

export default class Confirm {
  /**
   * @param {Object} Vue - the host app Vue class
   * @param {Object} options - other host specific options (e.g. Vuetify, i18n)
   */
  constructor(Vue, options) {
    this.vue = Vue
    this.options = options
    this.mounted = false // have to know if instance was mounted
    this.instance = null // the actual dialog component instance
  }

  /**
   * Mounts the UConfirm dialog in host #app root element
   */
  mount() {
    const Constructor = this.vue.extend(UConfirm)
    this.instance = new Constructor({ ...this.options })

    const node = document.createElement('div')
    document.querySelector('#app').appendChild(node)
    this.instance.$mount(node)
    this.mounted = true
  }

  /**
   * Shows confirm dialog
   * @param {Object} options - The options passed to dialog
   */
  show(options) {
    if (!this.mounted) {
      this.mount()
    }
    Object.assign(this.instance, { ...options })
    return this.instance
  }
}
