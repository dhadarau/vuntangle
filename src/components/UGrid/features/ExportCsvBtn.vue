<template>
  <v-btn :disabled="$parent.isDataLoading" small text color="primary" @click="onExportCsv">
    <v-icon small class="mr-1">mdi-file-export</v-icon>
    {{ $t('button.export_csv') }}
  </v-btn>
</template>
<script>
  export default {
    methods: {
      /**
       * Exports data in CSV format
       */
      onExportCsv() {
        const columnApi = this.$parent.columnApi
        const gridApi = this.$parent.gridApi

        // only get columns that are visible and do not have checkbox selection
        const columnKeys = []

        columnApi.getAllGridColumns().forEach((column) => {
          if (column.visible && !column.getColDef().checkboxSelection) {
            columnKeys.push(column.colId)
          }
        })

        // add a callback method that is run on every cell
        const processCellCallback = (params) => {
          // check if this cell is in a column that uses a valueFormatter
          if (params.column.getColDef().valueFormatter) {
            const valueFormatterParams = {
              ...params,
              data: params.node.data,
              node: params.node,
              colDef: params.column.getColDef(),
            }

            // run the value formatter
            return params.column.getColDef().valueFormatter(valueFormatterParams)
          }

          // return no custom formatting
          return params.value
        }

        gridApi.exportDataAsCsv({ columnKeys, processCellCallback })
      },
    },
  }
</script>
