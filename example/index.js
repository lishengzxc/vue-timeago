import Vue from 'vue'
import VueTimeago from '../src'
import app from './app'
import qs from './qs'

Vue.use(VueTimeago, {
  locale: require(`../locales/${qs().lang || 'en_US'}.json`),
  maxtime: {
    stage: 'YEAR',
    format: v => new Date(v).toLocaleDateString()
  }
})

new Vue({
  el: 'body',
  components: {app}
})
