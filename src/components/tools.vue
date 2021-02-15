<template>
  <div class="tools" >
  <br>
  <b-container fluid>
    <b-row>
      <b-col >
        <div id="export">
          <b-button variant="success" size="sm" @click="exportJson">Export</b-button>
        </div>
      </b-col>
      <b-col >
        <div id="import">
          <b-button variant="success" size="sm" @click="importJson">Import</b-button>
        </div>
      </b-col>
    </b-row>
    <br>
  </b-container>
  <JsonEditorModalImport ref="importModal" @ok="closeImportModal"/>
  <JsonEditorModalExport ref="exportModal" @ok="closeExportModal"/>
  </div>
</template>

<script>
// import Methods from '@/api/methods'
import JsonEditorModalImport from '@/components/json-editor-modal-import'
import JsonEditorModalExport from '@/components/json-editor-modal-export'

export default {
  name: 'Tools',
  components: {
    JsonEditorModalImport: JsonEditorModalImport,
    JsonEditorModalExport: JsonEditorModalExport
  },
  mounted: function () {
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    async importJson () {
      this.$refs.importModal.showModal()
    },
    async exportJson () {
      this.$refs.exportModal.showModal()
    },
    onContext (ctx) {
      // this.value = ctx.selectedYMD
      // this.formatted = ctx.selectedFormatted
      // this.selected = ctx.selectedYMD
    },
    async closeImportModal () {
    },
    async closeExportModal () {
    }
  }
}
</script>
