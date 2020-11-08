<template>
  <v-dialog
    v-model="displayDialog"
    :transition="false"
    persistent
    :width="width || 600"
    @keydown.esc="onClose"
    @keydown.enter="onAction"
  >
    <v-card>
      <v-card-title class="text-h5 font-weight-light">
        <span v-html="title"></span>
        <v-spacer />
        <v-btn :small="false" icon color="grey" @click="onClose"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>

      <!-- the component being rendered inside dialog with the props passed to it -->
      <div v-if="contentComponent" :style="`max-height: ${height || 400}px; overflow-y: auto`" class="px-6">
        <component :is="contentComponent" ref="content" v-bind="componentProps" />
      </div>

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
          btn.cancel
        </v-btn>
        <v-btn :small="false" min-width="80" @click="onAction">btn.ok</v-btn>
      </v-card-actions>
      <v-overlay v-if="progress" absolute>
        <v-progress-circular indeterminate />
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        title: null,
        component: null,
        componentProps: null,
        actionLabel: null,
        cancelLabel: null,
        width: null,
        height: null,

        progress: false,
      }
    },

    computed: {
      // return the component to be shown inside dialog by dynamically importing it
      contentComponent() {
        // return 'aaa'
        return this.component
      },
      // returns a boolean showing/hiding the dialog if component is set
      displayDialog() {
        return this.component !== null
      },
    },

    methods: {
      /**
       * Method showing progress if async action ongoing
       */
      showLoading() {
        this.progress = true
      },
      /**
       * Method hiding the progress if async action finished
       */
      hideLoading() {
        this.progress = false
        this.onClose() // close dialog on finish
      },

      /**
       * Hides and resets the dialog data
       */
      onClose() {
        this.title = null
        this.component = null
        this.componentProps = null
        this.cancelLabel = null
        this.actionLabel = null
        this.progress = false

        this.$emit('close')
      },

      /**
       * Method called when action occurs
       */
      async onAction() {
        this.progress = true
        await this.$refs.content.submit()
        this.progress = false
        this.onClose()
      },
    },
  }
</script>
