import { createApp, h } from 'vue'
import FloatVue  from '../src/index.js'
import Demo from './demo.vue'

const app = createApp({
  render() {
    return h('div', [
      h('h1', 'FloatVue Demo'),
      h('p', 'Click the icon in the bottom right corner to toggle the float.'),
      h(Demo)
    ])
  }
})

app.use(FloatVue)
app.mount('#app')
