import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  Mouse: () => import('../../components/Mouse.vue' /* webpackChunkName: "components/mouse" */).then(c => wrapFunctional(c.default || c)),
  Work: () => import('../../components/Work.vue' /* webpackChunkName: "components/work" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
