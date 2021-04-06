<template>
  <div data-scroll-container class="layout">
    <Mouse/>
    <div v-show='loaded' class="wrapper">
      <div class="nav">
      <NuxtLink class="hover-scale" to='/'><h1 class="hover-scale" ref="title">Alban</h1></NuxtLink>
      <ul ref="nav">
        <li>
          <NuxtLink class="hover-scale" to='/work'>Work</NuxtLink>
        </li>
        <li>
          <NuxtLink class="hover-scale" to='/experiments'>Experiments</NuxtLink>
        </li>
        <li>
          <NuxtLink class="hover-scale" to='/resume'>Resume</NuxtLink>
        </li>
        <li>
          <a class="hover-scale" href="https://www.linkedin.com/in/albanbleicher/" target="blank">LinkedIn</a>
        </li>
        <li>
          <a class="hover-scale" href="https://albchr.dev" target="blank">Github</a>
        </li>
      </ul>
    </div>
    <div ref="wrapper" class="content-wrapper">
      <transition name="fade" mode="out-in">
        <Nuxt v-if='loaded'/>
      </transition>
    </div>
    </div>
      <div v-if='!loaded' class="loading">
      <h1 ref="loading">LOADING...</h1>
  </div>
  </div>
</template>
<script>
import gsap from 'gsap'
import {CSSRulePlugin} from 'gsap/CSSRulePlugin'
gsap.registerPlugin(CSSRulePlugin)
import { mapActions, mapGetters } from 'vuex'
import Mouse from '../components/Mouse.vue'
export default {
  components: { Mouse },
  data() {
    return {
      loaded:false
    }
  },
  methods:{
    ...mapActions('Infos', ['fetchSettings']),
    ...mapActions('Work', ['fetchWork']),
    ...mapActions('Resume', ['fetchResume'])
  },
  created() {
    this.$root.timeline = gsap.timeline()
  },
  async mounted() {
    this.$root.timeline.from(this.$refs['loading'], {opacity:0, duration:1.5 , delay:0.2})
    await this.fetchSettings()
    await this.fetchResume()
    await this.fetchWork()
      this.loaded  = true
      this.$root.loaded=true
      const right = CSSRulePlugin.getRule('.content-wrapper:after')
    const left = CSSRulePlugin.getRule('.content-wrapper:before')
    const navBottom = CSSRulePlugin.getRule('.nav:after')
    const homeBottom = CSSRulePlugin.getRule('.home:after')
    this.$root.timeline.from([this.$refs['title'], this.$refs['nav']], {opacity:0, duration:1.2})
    this.$root.timeline.from([left, right], {cssRule:{
      height:0,
    }, duration:2, delay:1},1)
    this.$root.timeline.from([navBottom, homeBottom], {cssRule:{
      width:0,
    },  duration:2, delay:1},1)
    
// 
    // timeline.from(this.$refs['wrapper'], {opacity:0, duration:1.4})
  },
}
</script>