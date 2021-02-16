<template>
  <div class="app">
    <Mouse/>
    <Menu v-if='!loading' :projectsCount="projectList.length"/>
    <Nuxt v-if='!loading' />
    <transition name='fade' mode='out-in'>
      <Loading v-if='loading'/>
    </transition>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Menu from '../components/Menu'
import Loading from '../components/Loading'
import Mouse from '../components/Mouse'
import '@/assets/styles/App.scss'
export default {
  components: { Menu, Loading, Mouse },
  head() {
      return {
        title: this.siteName + ' — ' + this.siteBaseline,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.siteBaseline
          }
        ]
      }
    },
    data() {
      return {
        loading:true,
        hasMoved:false
      }
    },
  async mounted() {
    await this.fetchProjects()
    await this.fetchSettings()
    setTimeout(() => {
      this.loading = false
    },5000)
  },
  methods:{
    ...mapActions('projects',['fetchProjects']),
    ...mapActions('settings',['fetchSettings'])
  },
  computed:{
    ...mapGetters('projects',['projectList']),
    ...mapGetters('settings',['siteName', 'siteBaseline', 'siteContentBaseline']),
  },

}
</script>