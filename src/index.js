import FloatVue from './components/FloatVue.vue'

export { FloatVue }

const plugin = {
  install(app) {
    app.component('FloatVue', FloatVue)
  }
}

export default plugin
