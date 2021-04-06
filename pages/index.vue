<template>
<div ref="wrapper" class="home">
  <div class="introduction">
    <h2 ref="bonjour">Bonjour</h2>
    <div ref="text" v-html='this.introduction'></div>
  </div>
  <img ref="me" src="~/assets/images/me.jpg" alt="me smiling with snowy moutains in the back :)">
</div>
</template>
<script>
import SplitText from '~/utils/SplitText'
import { mapGetters } from 'vuex'
import gsap from 'gsap'
export default {
  computed: {
    ...mapGetters('Infos', ['introduction'])
  },
  mounted(){
      const text = new SplitText(this.$refs['text'])
    const title = new SplitText(this.$refs['bonjour'])
    if(!this.$root.loaded) {
    this.$root.timeline.from(title.chars, {opacity:0, y:100, duration:1.9, ease:"back", stagger:0.01},2)
    this.$root.timeline.from(text.words, {opacity:0, y:100, duration:1.9, ease:"back", stagger:0.01},2)
    this.$root.timeline.from(this.$refs['me'],{opacity:0, duration: .9, delay:0.5},2)
    }
    else {
      gsap.from(title.chars, {opacity:0, y:100, duration:1.9, ease:"back", stagger:0.01},0)
    gsap.from(text.words, {opacity:0, y:100, duration:1.9, ease:"back", stagger:0.01},0)
    gsap.from(this.$refs['me'],{opacity:0, duration: .9, delay:0.5},0)
    }
  } 
}
</script>