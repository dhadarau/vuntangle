<!--
  Tooltip for grid cell content
-->
<template>
  <div class="tooltip">
    <span v-html="text"></span>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    data() {
      return {
        text: null,
      }
    },
    beforeMount() {
      this.text = this.params.value
    },
  })
</script>

<style scoped>
  .tooltip {
    position: absolute;
    overflow: hidden;
    pointer-events: none;
    transition: opacity 0.1s;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 8px 16px;
    border-radius: 5px;
  }
  .tooltip.ag-tooltip-hiding {
    opacity: 0;
  }
</style>
