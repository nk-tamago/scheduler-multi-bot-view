<template>
  <div class="tasks">
    <br>
    <div id="add">
      <b-button size="sm" variant="success" @click="newTask">
        <b-icon icon="plus-circle-fill" aria-hidden="true"></b-icon>
        Add
      </b-button>
    </div>
    <br>
    <div>
      <b-table hover :items="items" :fields="fields">
        <template #cell(name)="data">
          {{ data.value }}
        </template>
        <template #cell(status)="data">
          <b-icon icon="circle-fill" v-bind:variant="data.item.variant"></b-icon>
        </template>
        <template #cell(actions)="row">
          <b-button
            squared
            variant="light"
            size="sm"
            @click="editTask(row.item, row.index, $event.target)"
            class="mr-1"
            v-b-tooltip.hover title="edit"
          >
            <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
          </b-button>
          <b-button
            squared
            variant="light"
            size="sm"
            @click="startTask(row.item, row.index, $event.target)"
            class="mr-1"
            v-b-tooltip.hover title="start"
          >
            <b-icon icon="play-fill" aria-hidden="true"></b-icon>
          </b-button>
          <b-button
            squared
            variant="light"
            size="sm"
            @click="stopTask(row.item, row.index, $event.target)"
            class="mr-1"
            v-b-tooltip.hover title="stop"
          >
            <b-icon icon="stop-fill" aria-hidden="true"></b-icon>
          </b-button>
          <b-button
            squared
            variant="light"
            size="sm"
            @click="deleteTask(row.item, row.index, $event.target)"
            class="mr-1"
            v-b-tooltip.hover title="delete"
          >
            <b-icon icon="trash2-fill" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
    <JsonEditorModalTask ref="editModal" @ok="closeModal"/>
  </div>
</template>

<script>
import Methods from '@/api/methods'
import JsonEditorModalTask from '@/components/json-editor-modal-task'

export default {
  name: 'Tasks',
  components: {
    JsonEditorModalTask: JsonEditorModalTask
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'Task Name' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Action' }
      ],
      items: []
    }
  },
  mounted: function () {
    this.getStatus()
  },
  methods: {
    async getStatus () {
      await Methods.getAllStatus()
        .then((res) => {
          this.items = res.data.map((item) => {
            return {
              name: item.name,
              status: item.status,
              variant: item.status === 'run' ? 'success' : 'danger'
            }
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    editTask (item, index, button) {
      this.$refs.editModal.showModal(item.name, true)
    },
    newTask () {
      this.$refs.editModal.showModal('', false)
    },
    async deleteTask (item, index, button) {
      this.$bvModal.msgBoxConfirm('Are you sure?')
        .then(value => {
          if (value === true) {
            Methods.deleteTask(item.name)
              .then(response => {
                this.getStatus()
              })
              .catch((e) => {
                console.log(e)
              })
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    async startTask (item, index, button) {
      if (this.items.some((i) => i.name === item.name && i.status === 'run') === true) {
        return
      }

      try {
        await Methods.startTask(item.name)
        await this.getStatus()
      } catch (e) {
        console.log(e)
      }
    },
    async stopTask (item, index, button) {
      if (this.items.some((i) => i.name === item.name && i.status === 'stop') === true) {
        return
      }

      try {
        await Methods.stopTask(item.name)
        await this.getStatus()
      } catch (e) {
        console.log(e)
      }
    },
    async closeModal () {
      await this.getStatus()
    }
  }
}
</script>

<style>
#add {
  text-align: left;
}
</style>
