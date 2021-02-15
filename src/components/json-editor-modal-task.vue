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
    <b-input-group prepend="name" class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input placeholder="input task name" v-model="editModal.name" v-bind:disabled="editModal.isUpdate" :state="nameState" aria-describedby="input-name-feedback"></b-form-input>
      <b-form-invalid-feedback id="input-name-feedback">
        {{nameInvalidMessage}}
      </b-form-invalid-feedback>
    </b-input-group>
  </div>
  <br>
  <div>
    <v-jsoneditor
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
import JsonSchema from '../../static/validation-json-schema-task.json'
import TemplateTask from '../../static/template-task.json'

export default {
  name: 'JsonEditorModalTask',
  data () {
    return {
      taskNames: [],
      editModal: {
        id: 'edit-modal',
        title: '',
        name: '',
        innerContent: {},
        content: {},
        errors: [],
        isUpdate: false
      },
      options: {
        schema: JsonSchema,
        mode: 'code',
        modes: ['code', 'tree'],
        onValidationError: (errors) => {
          this.editModal.errors = errors.map((error) => {
            // console.log(error.message)
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
    },
    nameInvalidMessage: {
      get () {
        if (this.editModal.isUpdate === false && this.editModal.name.length === 0) {
          return 'enter the task name'
        }
        if (this.editModal.isUpdate === false && this.taskNames.some((t) => t === this.editModal.name)) {
          return 'the task name exists'
        }
        return ''
      }
    },
    nameState: {
      get () {
        if (this.editModal.isUpdate === true) {
          return true
        }
        if (this.editModal.name.length === 0) {
          return false
        }
        if (this.taskNames.some((t) => t === this.editModal.name)) {
          return false
        }

        return true
      }
    }
  },
  methods: {
    async getTaskNames () {
      const res = await Methods.getAllStatus()
        .catch((e) => {
          // errを出す
          console.log(e)
        })
      this.taskNames = res.data.map((item) => {
        return item.name
      })
    },
    async showModal (name, isUpdate) {
      await this.getTaskNames()
      if (isUpdate === true) {
        const res = await Methods.getTask(name)

        this.editModal.content = res.data
        this.editModal.innerContent = this.editModal.content
        this.editModal.title = `Edit Task: ${name}`
        delete this.editModal.content.name
      } else {
        this.editModal.title = 'Create Task'
        this.editModal.content = TemplateTask
        this.editModal.innerContent = TemplateTask
      }
      this.editModal.isUpdate = isUpdate
      this.editModal.name = name

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
      const api = (name, post, isUpdate) => {
        if (isUpdate === true) {
          return Methods.putTask(name, post)
            .catch((e) => {
              // errを出す
              console.log(e)
            })
        } else {
          return Methods.addTask(post)
            .catch((e) => {
              // errを出す
              console.log(e)
            })
        }
      }

      let errorMessage = ''

      if (this.nameState === false) {
        errorMessage += 'correct the task name<br>'
      } else if (this.editModal.errors.length > 0) {
        errorMessage += this.editModal.errors.join('<br>')
      } else {
        let postContent = this.editModal.innerContent
        postContent.name = this.editModal.name
        await api(this.editModal.name, postContent, this.editModal.isUpdate)
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
              errorMessage += `<<br>${error.response.data}`
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
