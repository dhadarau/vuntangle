<template>
  <span>
    <slot></slot>
    <v-icon v-if="text && !success" small class="ml-2 mb-1" @click="onCopy">mdi-content-copy</v-icon>
    <v-tooltip v-if="success" right transition="none">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" small class="ml-2 mb-1" color="green">mdi-check</v-icon>
      </template>
      <span>{{ $t('copied') }}</span>
    </v-tooltip>
  </span>
</template>
<script>
  import utils from '@/utils'
  export default {
    props: {
      text: String,
    },
    data() {
      return {
        tout: null,
        success: false,
      }
    },
    methods: {
      onCopy() {
        if (utils.copyToClipboard(this.text)) {
          this.success = true
          this.tout = setTimeout(() => {
            this.success = false
            clearTimeout(this.tout)
            this.tout = null
          }, 3000)
        }
      },
    },

    beforeDestroy() {
      if (this.tout) {
        clearTimeout(this.tout)
      }
    },
  }
</script>
