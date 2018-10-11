import gridComponent from './grid.vue'

const GridUnit = {
 install (Vue) {
  if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
  }
  Vue.component('GridUnit', gridComponent)
 }
}

export default GridUnit
