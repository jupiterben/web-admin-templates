<template>
  <ag-grid-vue
    style="height: 500px"
    class="ag-theme-alpine container"
    :columnDefs="columnDefs"
    :rowData="rowData"
  />
</template>

<script>
import '@ag-grid-community/styles/ag-grid.css'
import '@ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from '@ag-grid-community/vue3'

export default {
  name: 'App',
  components: {
    AgGridVue
  },
  setup() {
    return {
      columnDefs: [
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' }
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ]
    }
  }
}
</script>
