<template>
  <div id="header">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      <b-navbar-brand href="#">Scheduler Bot</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav >
          <b-nav-item href="#/tasks">Tasks</b-nav-item>
          <b-nav-item href="#/tools">Tools</b-nav-item>
          <b-nav-item href="#/logs">Logs</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style>
#header {
  margin: 0;
}
</style>
