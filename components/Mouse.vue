<template>
    <transition name="fade" mode="out-in">
        <div v-if='hasMoved' ref="cursor" class="cursor"><div class="inner-cursor"></div></div>
    </transition>
</template>
<script>
import gsap from 'gsap'
export default {
    data() {
        return {
            hasMoved:false,
        }
    },
    mounted() {
        window.addEventListener('mousemove', (e) => this.handleMove(e))
    },
    methods: {
        handleMove(e) {
            if(!this.hasMoved) this.hasMoved = true
            const x = e.clientX
            const y = e.clientY
            gsap.to(this.$refs['cursor'], {x:x, y:y, duration: 0.4})
            if(e.target.localName==="a") {
                gsap.to(this.$refs['cursor'], {scale:3, duration:0.8})
            }
            else {
                gsap.to(this.$refs['cursor'], {scale:1, duration:0.8})

            }
        }
    },
}
</script>