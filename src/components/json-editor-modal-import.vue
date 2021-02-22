<template>
  <!-- Info modal -->
  <b-modal
    :id="editModal.id"
    :title="editModal.title"
    size="xl"
    @ok="editOk"
    scrollable
    no-close-on-backdrop
    no-close-on-esc
  >
  <div>
    <v-jsoneditor
      readonly="true"
      v-model="content"
      :options="options"
      :plus="false"
      height="450px"
      @error="onError"
    ></v-jsoneditor>
  </div>
  </b-modal>
</template>

<script>
import Methods from '@/api/methods'
import JsonSchema from '../../static/validation-json-schema-import.json'

export default {
  name: 'JsonEditorModalImport',
  data () {
    return {
      editModal: {
        id: 'import-modal',
        title: '',
        innerContent: {},
        content: {},
        errors: []
      },
      options: {
        schema: JsonSchema,
        mode: 'code',
        onValidationError: (errors) => {
          this.editModal.errors = errors.map((error) => {
            return error.message
          })
        }
      }
    }
  },
  computed: {
    content: {
      get () {
        return this.editModal.content
      },
      set (value) {
        this.editModal.errors = []
        this.editModal.innerContent = value
      }
    }
  },
  methods: {
    async showModal () {
      this.editModal.content = ''
      this.editModal.innerContent = this.editModal.content
      this.editModal.title = `Import`

      this.$bvModal.show(this.editModal.id)
    },
    async editOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.editSubmit()
    },
    async editSubmit () {
      const htmlToVNode = (html) => {
        return [this.$createElement('div', { domProps: { innerHTML: html } })]
      }
      const api = (post) => {
        return Methods.importJson(post)
          .catch((e) => {
            // errを出す
            console.log(e)
            throw e
          })
      }

      let errorMessage = ''

      const names = this.editModal.innerContent.tasks.map((task) => {
        return task.name
      })

      if (Array.from(new Set(names)).length !== names.length) {
        errorMessage += 'name is not unique<br>'
      } else if (this.editModal.errors.length > 0) {
        errorMessage += this.editModal.errors.join('<br>')
      } else {
        let postContent = this.editModal.innerContent
        postContent.name = this.editModal.name
        await api(postContent)
          .then((response) => {
            this.editModal.content = postContent

            this.$nextTick(() => {
              this.$emit('ok')
              this.$bvModal.hide(this.editModal.id)
            })
          })
          .catch((error) => {
            errorMessage = error.message
            if (error.response) {
              errorMessage += `<<br>${JSON.stringify(error.response.data)}`
            }
          })
      }

      if (errorMessage !== '') {
        this.$bvModal.msgBoxOk(htmlToVNode(errorMessage), {
          title: 'Confirmation',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
      }
    },
    onError () {
      // this.editModal.isValid = false
      console.log('error')
    }
  }
}
</script>
