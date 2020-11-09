<template>
  <div class="d-flex flex-column align-stretch fill-height">
    <!-- grid header containing extra features -->
    <v-card-actions v-if="gridReady && !dense" class="data-grid-footer py-1 px-2">
      <!-- quick filter text -->
      <quick-filter v-if="enableQuickFilter" class="flex-grow-1" />
      <!-- <v-spacer /> -->
      <!-- refresh/refetch data feature -->
      <refresh-btn v-if="enableRefresh" />
      <!-- export CSV data feature -->
      <export-csv-btn v-if="enableCsvExport" />
      <!-- columns feature -->
      <columns-menu v-if="enableColumnsMenu" />
    </v-card-actions>

    <!-- the master ag-grid -->
    <ag-grid-vue
      v-show="gridReady"
      :id="id"
      ref="dataGrid"
      :row-selection="rowSelection"
      :class="`ag-theme-alpine ut-grid ${dense ? 'ut-grid-dense' : ''} ${borderless ? 'ut-grid-borderless' : ''}`"
      :style="'height:' + height + 'px'"
      :default-col-def="defaultColDef"
      :grid-options="gridOptions"
      :column-defs="columnDefs"
      :row-data="gridData"
      :framework-components="frameworkComponents"
      :loading-overlay-component="loadingOverlayComponent"
      @grid-ready="onGridReady"
      @selection-changed="onSelectionChanged"
      @first-data-rendered="onFirstDataRendered"
      v-on="$listeners"
    />
  </div>
</template>

<script>
  import { AgGridVue } from 'ag-grid-vue'
  import { mapGetters } from 'vuex'

  // import merge from 'lodash/merge'
  import LoadingOverlay from './features/LoadingOverlay'
  import CellTooltip from './features/CellTooltip'

  import QuickFilter from './features/QuickFilter'
  import RefreshBtn from './features/RefreshBtn'
  import ExportCsvBtn from './features/ExportCsvBtn'
  import ColumnsMenu from './features/ColumnsMenu'

  export default {
    components: {
      AgGridVue,
      QuickFilter,
      RefreshBtn,
      ExportCsvBtn,
      ColumnsMenu,
    },
    props: {
      id: String,
      dense: { type: Boolean, default: false },
      borderless: { type: Boolean, default: false },
      columns: Array,
      rowSelection: String,
      initialSelectedRows: Array,
      selectedRows: Array,

      /**
       * boolean enabling grid data quick filtering
       */
      enableQuickFilter: { type: Boolean, default: true },

      /**
       * boolean enabling grid data refresh
       * requires dataActions to be defined
       */
      enableRefresh: Boolean,

      /**
       * boolean enabling exporting CSV format grid data
       */
      enableCsvExport: Boolean,

      /**
       * boolean enabling columns menu that allows show/hide columns
       */
      enableColumnsMenu: Boolean,

      /**
       * Data passed to the grid from a parent component (e.g. page)
       * Usually this data returns a store state data list
       * This rowData and (dataGetter, dataActions) are mutually excluding each other
       */
      rowData: Array,

      /**
       * String representing the data state getter from a store (e.g. 'alerts/alertRules')
       * It reads as 'module.getter'. This will fill the rowData inside the grid
       * Not to be used when using rowData
       */
      dataGetter: String,
      /**
       * The store actions used to fetch data required for the grid
       * This is an array because some grids require multiple data sources for rendering content
       * This also is recommended if:
       * - enableRefresh is true
       * - the component/page using the grid is not handling the 'gridrefresh' event
       */
      dataActions: String,

      /**
       * The store data fetching flags when using dataActions
       * This is an array because some grids have multiple data sources
       * It reads as 'module.loader'
       */
      dataLoaders: {
        type: Array,
        default() {
          return []
        },
      },

      /**
       * boolean indicating when fetching async action occurs outside data-grid
       */
      outerPendingAction: {
        type: Boolean,
        default: false,
      },

      /**
       * boolean indicating if the grid should preserve it's state
       */
      stateless: {
        type: Boolean,
        default: false,
      },

      height: Number,
      filter: String,
    },

    data() {
      return {
        gridReady: false,
        frameworkComponents: {
          customLoadingOverlay: LoadingOverlay,
          cellTooltip: CellTooltip,
        },
        loadingOverlayComponent: 'customLoadingOverlay',

        gridOptions: {
          animateRows: true,
          suppressDragLeaveHidesColumns: true,
          suppressColumnMoveAnimation: true,
          enableCellTextSelection: true,
          tooltipMouseTrack: true,
          tooltipShowDelay: 0,
          suppressCellSelection: true,
          rowStyle: { cursor: 'pointer' },
          rowMultiSelectWithClick: true,
          // rowSelection: 'multiple',
          // enableBrowserTooltips: true,
        },
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: true,
          tooltipComponent: 'cellTooltip',
          // minWidth: 50,
          /**
           * Use getter method to translate header names
           * the headerName prop must be the i18n key
           */
          headerValueGetter: (params) => {
            return this.$t(params.colDef.headerName)
          },
        },

        // boolean indicating when fetching async action occurs inside data-grid
        innerPendingAction: false,

        /**
         * There is a timing issue if the initial selected rows and data rows
         * are not from the same data source. These are flags so selecting the
         * rows can be tried when the initial selected rows change or the
         * data rows are loaded.
         */
        isInitialSelectedRowsSet: false,
        dataIsRendered: false,

        columnDefs: [...this.columns],
      }
    },

    computed: {
      ...mapGetters(['cloudMethods']),

      // columnDefs() {
      //   return this.columns || []
      // },

      /**
       * The grid data
       * - rowData passed from parent referencing a store data
       * - or o store data getter if dataGetter is set on the grid
       */
      gridData() {
        if (this.rowData) {
          return this.rowData
        }
        if (this.dataGetter) {
          return this.$store.getters[this.dataGetter]
        }
        return null
      },

      actions() {
        return this.dataActions?.replace(/ /g, '').split(',') || []
      },

      /**
       * Boolean to show/hide embedded header based on passed options
       */
      showHeader() {
        return this.enableRefresh || this.enableCvsExport || this.enableQuickFilter || this.enableColumnsMenu
      },

      /**
       * Boolean showing the loading overlay based on action being trigger
       * inside data-grid or outside in another component (page)
       */
      isFetching() {
        let fetching = false
        this.actions.forEach((action) => {
          if (!fetching && this.cloudMethods.includes(action.split('/')[1])) {
            fetching = true
          }
        })
        return fetching
      },
    },

    watch: {
      // refresh grid headers and rows on locale change
      '$i18n.locale'() {
        if (this.gridApi) {
          this.gridApi.refreshHeader()
          this.gridApi.redrawRows()
        }
      },
      // watch the isFetching to trigger grid loading overlay
      isFetching: {
        immediate: true,
        handler(value) {
          if (this.gridApi) {
            value ? this.gridApi.showLoadingOverlay() : this.gridApi.hideOverlay()
          }
        },
      },
      initialSelectedRows() {
        this.setInitialSelectedRows()
      },
      filter(value) {
        this.gridApi.setQuickFilter(value)
      },
      rowSelection(value) {
        this.setSelectionType(value)
      },
    },

    /*
     * Set grid options based on inputted 'props'.
     */
    created() {
      this.columnDefs.unshift({
        colId: 'sel-col',
        resizable: true,
        filter: false,
        sortable: false,
        suppressMenu: true,
        suppressSizeToFit: true,
        width: 20,
        cellStyle: { padding: '3px', display: 'flex', justifyContent: 'center' },
        hide: !this.rowSelection,
        cellRenderer: (params) => {
          if (this.rowSelection === 'single') {
            return `<i class="mdi ${
              params.node.selected ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'
            }" style="font-size: 18px;" />`
          }

          if (this.rowSelection === 'multiple') {
            return `<i class="mdi ${
              params.node.selected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'
            }" style="font-size: 18px;" />`
          }
        },
      })
      // if (this.rowSelection === 'single') {

      // }
      // set row selection
      // if (
      //   (this.rowSelect.type === 'single' || this.rowSelect.type === 'multiple') &&
      //   this.calculatedColumnDefs.length > 0
      // ) {
      //   this.gridOptions.rowSelection = this.rowSelect.type

      //   // add a checkbox column
      //   if (this.rowSelect.checkbox === true) {
      //     // set checkbox header for multi-select
      //     const selectCheckbox = checkbox()
      //     if (this.rowSelect.type === 'multiple') {
      //       selectCheckbox.headerCheckboxSelection = true
      //     }

      //     this.calculatedColumnDefs.unshift(selectCheckbox)
      //   }
      // }

      if (this.dense) {
        Object.assign(this.gridOptions, {
          headerHeight: 28,
          rowHeight: 28,
        })
      }
    },
    methods: {
      onGridReady(params) {
        this.gridApi = params.api
        this.columnApi = params.columnApi

        // used to add features only if grid ready
        this.gridReady = true

        // bind grid events if not stateless
        if (!this.stateless) {
          // bindState(this.id, this.gridApi, this.columnApi)
        }

        // fetch data if dataActions are set
        if (this.dataActions) {
          this.fetchData()
        }
      },

      /**
       * Dispatches store actions to fetch data needed for the grid
       * The store actions are passed as an array using dataActions prop
       * @param refetch - boolean to force re-fetching the data
       */
      async fetchData(refetch = false) {
        /**
         * if dataActions are not defined, emit the gridrefresh event
         * this should be handled by the parent component that is using the grid
         */
        if (this.actions.length === 0) {
          this.$emit('gridrefresh')
        } else {
          /**
           * dispatch the dataActions
           */
          await Promise.all(
            this.actions.map(async (action) => {
              try {
                await this.$store.dispatch(action, refetch)
              } catch (ex) {
                console.log(ex)
                // shows vuex exception when running in dev mode
              }
            }),
          )
        }
      },

      /**
       * Updates the selected-rows prop when selection changed
       */
      onSelectionChanged() {
        this.gridApi.refreshCells({
          columns: ['sel-col'],
          force: true,
        })
        // this.columnApi.setColumnVisible('sel-col', true)
        this.$emit('update:selected-rows', this.gridApi.getSelectedRows())
      },

      setSelectionType(selection) {
        console.log('set type')
        this.gridApi.deselectAll()
        this.gridApi.refreshCells({
          columns: ['sel-col'],
          force: true,
        })
        this.columnApi.setColumnVisible('sel-col', selection !== null)
      },

      /**
       * Used to display any selected rows
       */
      onFirstDataRendered(gridEvent) {
        this.dataIsRendered = true
        this.setInitialSelectedRows()
        // remove the loading icon once data is loaded
        gridEvent.api.hideOverlay()
      },
      setInitialSelectedRows() {
        if (this.isInitialSelectedRowsSet) {
          return
        }

        // try to set the selected rows if the selected rows and data rows have
        // been loaded
        if (this.initialSelectedRows?.length > 0 && this.gridData !== null && this.dataIsRendered) {
          this.initialSelectedRows.forEach((nodeId) => {
            const rowNode = this.gridApi.getRowNode(nodeId)
            rowNode && rowNode.setSelected(true)
          })

          this.isInitialSelectedRowsSet = true
        }
      },
    },
    gridApi: null,
    columnApi: null,
  }
</script>
<style>
  .ut-grid {
    height: 100%;
    width: 100%;
  }
  .ag-theme-alpine .ut-grid-header.ag-header-cell {
    padding: 0;
  }
  .ag-theme-alpine.ut-grid-dense .ag-row {
    font-size: 12px;
  }
  .ag-theme-alpine.ut-grid-borderless .ag-root-wrapper {
    border: none;
  }
  .ag-theme-alpine.ut-grid-dense .ag-header-row {
    font-size: 12px;
  }

  .data-grid-footer {
    background: #fff;
    border: 1px #ccc solid;
    border-radius: 5px 5px 0 0;
    position: relative;
    top: 1px;
  }

  .ag-theme-alpine .ag-header-cell {
    /* padding: 0 !important; */
  }
</style>
