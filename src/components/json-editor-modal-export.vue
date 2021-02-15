<template>
  <!-- Info modal -->
  <b-modal
    :id="id"
    :title="title"
    size="xl"
    @ok="exportOk"
    scrollable
    no-close-on-backdrop
    no-close-on-esc
  >
    <div>
      <b-form-textarea
        id="textarea"
        v-model="content"
        rows="10"
        max-rows="18"
        readonly="true"
      ></b-form-textarea>
    </div>
  </b-modal>
</template>

<script>
import Methods from '@/api/methods'

export default {
  name: 'JsonEditorModalExport',
  data () {
    return {
      id: 'export-modal',
      title: 'Export',
      content: {},
      errors: []
    }
  },
  methods: {
    async showModal () {
      const res = await Methods.exportJson()
      this.content = res.data

      this.$bvModal.show(this.id)
    },
    async exportOk (bvModalEvt) {
    }
  }
}
</script>
