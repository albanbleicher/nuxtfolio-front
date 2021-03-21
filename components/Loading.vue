<template>
    <div class="loading">
        <span ref='wait'>just a sec...</span>
    </div>
</template>
<script>
import gsap from 'gsap'
import SplitText from '@/utils/SplitText'
export default {
    mounted() {
        const split = new SplitText(this.$refs['wait'])
    const chars= split.chars
    gsap.from(chars, {duration:2, opacity:0, y:-20,  ease:"back", stagger: 0.06 });
    setTimeout(() => {
        gsap.to('.loading', {opacity:0, ease:'circ', duration: 2})
    }, 2000)
    }
}
</script>