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
        <span v-html="$t(title)"></span>
        <v-spacer />
        <v-btn :small="false" icon color="grey" @click="onClose"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>

      <!-- the component being rendered inside dialog with the props passed to it -->
      <div v-if="component" :style="`max-height: ${height || 400}px; overflow-y: auto`" class="px-6">
        <component
          :is="component"
          ref="content"
          v-bind="componentProps"
          @progress-show="progress = true"
          @progress-hide="progress = false"
          @close="onClose"
        />
      </div>

      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn
          text
          min-width="80"
          class="text-capitalize grey--text"
          v-text="$t(cancelLabel || 'button.cancel')"
          @click="onClose"
        />
        <v-btn min-width="80" color="primary" elevation="0" v-text="$t(actionLabel || 'button.ok')" @click="onAction" />
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
      // returns a boolean showing/hiding the dialog if component is set
      displayDialog() {
        return this.component !== null
      },
    },

    methods: {
      /**
       * Hides and resets the dialog data
       */
      onClose() {
        this.$emit('close') // this notifies dialog opener about closing

        this.title = null
        this.component = null
        this.componentProps = null
        this.cancelLabel = null
        this.actionLabel = null
        this.width = null
        this.progress = false

        this.$off('close')
      },

      onAction() {
        // the inner content component must implement "action" method
        this.$refs.content.action()
      },
    },
  }
</script>
