<template>
  <div class='home'>
    <h1 ref='title'>Hello, I'm Alban,</h1>
    <div ref='baseline' v-html='siteContentBaseline'></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SplitText from '@/utils/SplitText'
import gsap from 'gsap'
export default {
  computed:{
    ...mapGetters('settings', ['siteContentBaseline'])
  },
  mounted() {
    const split_header = new SplitText(this.$refs['title'])
    const chars_header = split_header.chars
    const timeline = gsap.timeline()
    timeline.from(chars_header, {duration:1, opacity:0, y:-20,  ease:"back", stagger: 0.06 });
    timeline.from(this.$refs['baseline'], {duration:1.9, opacity:0, y:-40,  ease:"back" },'-=0.6').then(() => {
      // window.addEventListener('mousemove', (e) => {
      //   gsap.to(this.$refs['title'], {x:e.movementX*1.7, y:e.movementY*1.7, duration:3})
      //   gsap.to(this.$refs['baseline'], {x:e.movementX, y:e.movementY, duration:2})
      // })
    })
  }
}
</script>
