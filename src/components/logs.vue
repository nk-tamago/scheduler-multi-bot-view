<template>
  <div class="logs" >
  <br>
  <b-container fluid>
    <b-row>
      <b-col sm="3">
        <b-input-group class="mb-0">
          <b-form-input
            id="date-input"
            v-model="selectDate"
            type="text"
            placeholder="YYYY-MM-DD"
            autocomplete="off"
            size="sm"
          ></b-form-input>
          <b-input-group-append>
            <b-form-datepicker
              v-model="selectDate"
              button-only
              right
              locale="en-US"
              aria-controls="date-input"
              size="sm"
              button-variant="dark"
              @context="onContext"
            ></b-form-datepicker>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col sm="2" >
        <b-form-group
          label="order"
          label-for="order-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="order-select"
            v-model="sortDirection"
            :options="['desc','asc']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="2" >
        <b-form-group
          label="level"
          label-for="level-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="level-select"
            v-model="level"
            :options="['-','error','warn','info','http','verbose','debug','silly']"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="2">
        <b-form-group
          label="limit"
          label-for="limit-value"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input
            id="limit-value"
            v-model="limit"
            type="number"
            size="sm"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col >
        <div id="log-load">
          <b-button variant="success" size="sm" @click="load">Query</b-button>
        </div>
      </b-col>
    </b-row>
    <br>
    <b-table id="log-table" sticky-header="500px" :busy="isBusy" responsive striped hover :items="items" :fields="fields" small >
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(timestampme)="data">
        {{ data.value }}
      </template>
      <template #cell(level)="data">
        {{ data.value }}
      </template>
      <template #cell(message)="data">
        {{ data.value }}
      </template>
    </b-table>
  </b-container>
  </div>
</template>

<script>
import Methods from '@/api/methods'

export default {
  name: 'Logs',
  mounted: function () {
    const now = new Date()
    this.selectDate = (now.getFullYear() + '-' + ('00' + (now.getMonth() + 1)).slice(-2) + '-' + ('00' + now.getDate()).slice(-2))
  },
  data () {
    return {
      isBusy: false,
      sortDirection: 'desc',
      level: '-',
      limit: 50,
      fields: [
        { key: 'timestamp', label: 'Timestamp' },
        { key: 'level', label: 'Level' },
        { key: 'message', label: 'Message' }
      ],
      items: [],
      selectDate: ''
    }
  },
  methods: {
    async load () {
      try {
        this.isBusy = true
        const res = await Methods.getLogs(
          this.selectDate.replace(/-/g, ''),
          this.sortDirection,
          this.limit,
          this.level === '-' ? 'all' : this.level
        )
        this.items = res.data
        this.isBusy = false
      } catch (e) {
        // errを出す
        console.log(e)
        this.isBusy = false
      }
    },
    onContext (ctx) {
      // this.value = ctx.selectedYMD
      // this.formatted = ctx.selectedFormatted
      // this.selected = ctx.selectedYMD
    }
  }
}
</script>

<style>
#log-table {
  text-align: left;
}
#log-load {
  text-align: right;
}

</style>
