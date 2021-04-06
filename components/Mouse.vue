<template>
   <div v-show='wait' class="cursor-wrapper">
        <div ref="cursor" class="cursor"></div>
   </div>
</template>
<script>
import gsap from 'gsap'
export default {
    data() {
       return {
            wait:false
       }
    },
    mounted() {
        setTimeout(() =>{
            this.wait =true
        },2000)
        window.addEventListener('mousemove', (e) => {
            this.move(e)
        })
    },
    methods:{
        move(e) {
            if(e.target.classList.contains('hover-scale')) {
             gsap.to(this.$refs['cursor'],  {scaleX:0.3, scaleY:0.3})
            }
            else {
                 gsap.to(this.$refs['cursor'],  {scaleX:1, scaleY:1})
            }
             gsap.to(this.$refs['cursor'],  {x:e.clientX-15, y:e.clientY-15})
        }
    }
}
</script>