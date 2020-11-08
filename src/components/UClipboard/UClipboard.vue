<template>
  <span class="u-clipboard">
    <slot></slot>
    <v-icon v-if="copy" small class="mx-2" @click="onCopy" v-text="icon" />
    <span v-if="icon === 'mdi-check'" class="u-clipboard-confirm px-2 rounded-pill" v-text="$t('copied')" />
  </span>
</template>
<script>
  import utils from '@/utils'
  export default {
    props: {
      copy: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        tout: null,
        icon: 'mdi-content-copy',
      }
    },
    methods: {
      onCopy() {
        if (utils.copyToClipboard(this.copy)) {
          this.icon = 'mdi-check'
          this.tout = setTimeout(() => {
            this.icon = 'mdi-content-copy'
            clearTimeout(this.tout)
            this.tout = null
          }, 1000)
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

<style>
  .u-clipboard {
    position: relative;
  }
  .u-clipboard-confirm {
    position: absolute;
    background: #555;
    border-radius: 3px;
    font-size: 11px;
    color: #fff;
    top: 2px;
    z-index: 2;
  }
</style>
