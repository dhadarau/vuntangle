<template>
  <v-menu left offset-y :close-on-content-click="false">
    <template #activator="{ on }">
      <ut-btn text v-on="on">
        <v-icon small class="mr-1">mdi-format-columns</v-icon>
        {{ $t('button.columns') }}
      </ut-btn>
    </template>
    <v-list>
      <v-list-item v-for="(column, index) in columns" :key="index">
        <template #default>
          <v-checkbox v-model="column.visible" hide-details class="my-0 py-0" :label="$t(column.title)"></v-checkbox>
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
  export default {
    data() {
      return {
        columns: [],
      }
    },

    watch: {
      columns: {
        deep: true,
        handler(cols) {
          cols.forEach((col) => {
            this.$parent.columnApi.setColumnVisible(col.key, col.visible)
          })
        },
      },
    },
    mounted() {
      const columnApi = this.$parent.columnApi
      const columns = []

      columnApi.getAllColumns().forEach((col) => {
        if (col.getColDef().headerName) {
          columns.push({
            key: col.colId,
            title: col.getColDef().headerName,
            visible: col.visible,
          })
        }
      })
      this.columns = columns
    },
  }
</script>
