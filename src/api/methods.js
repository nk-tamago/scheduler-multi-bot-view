import Api from './index'

export default {
  getTask (name) {
    return Api().get('/tasks/' + name.toString())
  },
  getAllStatus () {
    return Api().get('/status')
  },
  getStatus (name) {
    return Api().get('/status/' + name.toString())
  },
  addTask (task) {
    return Api().post('/tasks', task)
  },
  putTask (name, task) {
    return Api().put('/tasks/' + name.toString(), task)
  },
  deleteTask (name) {
    return Api().delete('/tasks/' + name.toString())
  },
  startTask (name) {
    return Api().get('/tasks/' + name.toString() + '/start')
  },
  stopTask (name) {
    return Api().get('/tasks/' + name.toString() + '/stop')
  },
  getLogs (date, order = 'desc', limit = 50, level = 'all') {
    const params = { params: {
      order: order,
      limit: limit,
      level: level
    }}

    if (level === 'all') {
      delete params.params.level
    }
    return Api().get('/logs/' + date.toString(), params)
  },
  exportJson () {
    return Api().get('/export/')
  },
  importJson (json) {
    return Api().post('/import', json)
  }

}
