<template>
  <div id="app">
    <Header></Header>
<!--
    <b-container id="main" fluid="max-width" >
-->
    <b-container id="main" fluid="xl" >
      <b-row>
        <!--
        <b-col cols="3" class="border">
          <TaskList></TaskList>
        </b-col>
        -->
<!--        <b-col class="border">-->
        <b-col >
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/header'
import Tasks from '@/components/tasks'
import Logs from '@/components/logs'
import Tools from '@/components/tools'

export default {
  name: 'App',
  components: {
    Header: Header,
    Tasks: Tasks,
    Logs: Logs,
    Tools: Tools
  },
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
