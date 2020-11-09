<template>
  <div class="d-flex align-center">
    <v-text-field
      :disabled="$parent.isDataLoading"
      clearable
      :placeholder="$t('global.quick_filter')"
      hide-details
      solo
      dense
      flat
      autofocus
      prepend-icon="mdi-magnify"
      class="ml-2"
      @input="onQuickFilter"
    />
    <span v-if="value" class="mx-4">{{ $t('global.quick_filter_text', [filteredCount, totalCount]) }}</span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: null,
        filteredCount: null,
        totalCount: null,
      }
    },
    methods: {
      /**
       * method that filters the columns values
       * it works for text/string based columns
       * if needed to work on date like columns
       * use getQuickFilterText column def to define that
       */
      onQuickFilter(value) {
        /**
         * using $parent to refer to the grid main component
         * assuming that this component is dedicated and created as a grid feature only
         */
        this.$parent.gridApi.setQuickFilter(value)

        this.value = value
        this.filteredCount = this.$parent.gridApi.getDisplayedRowCount()
        this.totalCount = this.$parent.gridOptions.rowData.length
      },
    },
  }
</script>
