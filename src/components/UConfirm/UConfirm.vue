<template>
  <v-dialog
    v-model="show"
    :transition="false"
    persistent
    :width="width || 600"
    @keydown.esc="onClose"
    @keydown.enter="onAction"
  >
    <v-card class="test">
      <v-card-title class="text-h5 font-weight-light">
        <span v-html="$t(title)"></span>
        <v-spacer />
        <v-btn :small="false" icon color="grey" @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text v-if="message" v-html="message" />

      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn
          depressed
          color="transparent"
          :small="false"
          min-width="80"
          class="text-capitalize grey--text"
          @click="onClose"
        >
          {{ cancelLabel || 'btn.no' }}
        </v-btn>
        <v-btn :small="false" min-width="80" @click="onConfirm">{{ confirmLabel || 'btn.yes' }}</v-btn>
      </v-card-actions>
      <v-overlay v-if="progress" absolute color="white">
        <v-progress-circular indeterminate color="utGreen" />
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        title: null,
        message: null,
        confirmLabel: null,
        cancelLabel: null,
        width: null,
        height: null,
        progress: false,
      }
    },

    computed: {
      show() {
        return this.message !== null
      },
    },

    mounted() {},

    methods: {
      /**
       * Method called when showing the dialog
       *
       * The following options can be set to the dialog
       * @param {Object} options
       * @param {String} options.title - The dialog window title as localized key
       * @param {String} options.message - The message to be confirmed (confirm modal)
       * @param {String} options.cancelLabel - The cancel button label as localized key
       * @param {String} options.confirmLabel - The confirm button label as localized key
       * @param {Number} options.width - The dialog width in pixels, default 600
       * @param {Number} options.height - The content component max-height in pixels, default 400
       */
      // show(options) {
      //   Object.assign(this, { ...options })
      //   if (!this.component && !this.message) {
      //     console.warn('UtDialog: "component" or "message" must be set')
      //   }
      // },

      /**
       * Hides and resets the dialog data
       */
      onClose() {
        this.title = null
        this.message = null
        this.cancelLabel = null
        this.confirmLabel = null
        this.progress = false
        this.$off('confirm')
      },

      async onConfirm() {
        this.progress = true
        await new Promise((resolve) => {
          this.$emit('confirm', resolve)
        })
        this.onClose()
      },
    },
  }
</script>
