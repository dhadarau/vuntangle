import UToast from './UToast.vue'

/**
 * The UtToast plugin part of the UT components library ($ut)
 *
 * Used mostly on click or async completed events like:
 * this.$ut.toast.show('The Message')
 *
 * Obs! Once the toast component is mounted it will
 * remain that way. No unmount or destroy methods implemented (or required)
 */
export default class Toast {
  constructor(Vue, options) {
    this.vue = Vue
    this.options = options
    this.mounted = false // have to know if instance was mounted
    this.instance = null // the actual toast component instance
  }

  /**
   * Mounts the UToast in host #app root element
   */
  mount() {
    const Constructor = this.vue.extend(UToast)
    this.instance = new Constructor({ ...this.options })

    const node = document.createElement('div')
    document.querySelector('#app').appendChild(node)
    this.instance.$mount(node)
    this.mounted = true
  }
  /**
   * Adds and shows the toast message
   * @param {String} message - The message to display as toast
   */
  show(message) {
    // make sure the instance is created and mounted
    if (!this.mounted) {
      this.mount()
    }
    // call the addToast method from UtToast component
    this.instance.addToast(message)
  }
}
