<template>
  <div v-if='loaded' class="layout_container">
    <Nuxt />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return {
      loaded:false
    }
  },
  async created(){
    await this.fetchProjects()
    this.loaded=true;
  },
  methods:{
    ...mapActions('Projects', ['fetchProjects'])
  }
}
</script>
