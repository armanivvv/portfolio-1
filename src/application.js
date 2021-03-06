import 'whatwg-fetch'
// TODO: Investigate on importing only needed bits, by using core-js, instead whole bable-polyfill:
// https://babeljs.io/docs/usage/polyfill/
// https://github.com/zloirock/core-js#commonjs
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import VueHead from 'vue-head'
import VueI18n from 'vue-i18n'
import App from 'src/App'
import router from 'src/router'
import Card from 'components/Card/Card'
import Icon from 'components/Icon/Icon'
import { getAllBlogPosts } from 'services/blog'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueHead)
Vue.use(VueI18n)

Vue.component('Card', Card)
Vue.component('Icon', Icon)

// http://varun.ca/icon-component/
const files = require.context('!svg-sprite-loader!./assets/icons', false, /.*\.svg$/)
files.keys().forEach(files)

new Vue({
  router,

  data: () => ({
    posts: [],
  }),

  // Used in various views with `$root` (we don't want to fetch in multiple places, as it's a really small request - for now!)
  computed: {
    blogposts() {
      return this.posts.filter(post => !post.data.isProject)
    },
    projects() {
      return this.posts.filter(post => post.data.isProject)
    },
  },

  async mounted() {
    this.posts = await getAllBlogPosts()
  },

  render: h => h(App),
}).$mount('#app')
