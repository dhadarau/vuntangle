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
          text
          min-width="80"
          class="text-capitalize grey--text"
          v-text="$t(cancelLabel || 'button.no')"
          @click="onClose"
        />
        <v-btn
          min-width="80"
          color="primary"
          elevation="0"
          v-text="$t(confirmLabel || 'button.yes')"
          @click="onConfirm"
        />
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

    methods: {
      /**
       * Hides and resets the dialog data
       */
      onClose() {
        this.title = null
        this.message = null
        this.cancelLabel = null
        this.confirmLabel = null
        this.width = null
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
