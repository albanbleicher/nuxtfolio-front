export { default as Mouse } from '../../components/Mouse.vue'
export { default as Work } from '../../components/Work.vue'

export const LazyMouse = import('../../components/Mouse.vue' /* webpackChunkName: "components/mouse" */).then(c => wrapFunctional(c.default || c))
export const LazyWork = import('../../components/Work.vue' /* webpackChunkName: "components/work" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
export function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
