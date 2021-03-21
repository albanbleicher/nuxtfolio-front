<template>
    <div class="content">
         <h3 ref="title" :style='"color:"+project.color'>{{project.title}}</h3>
         <p ref="sub">{{project.short_description}}</p>
    </div>
</template>
<script>
import gsap from 'gsap'
import SpltText from '@/utils/SplitText'

export default {
    props:['project'],
    mounted(){
        const timeline = gsap.timeline()
        const title = new SpltText(this.$refs['title']).chars
        const sub = new SpltText(this.$refs['sub']).chars
        timeline.from(title, {duration:0.6, opacity:0, y:-20,  ease:'back', stagger: 0.04 });
        timeline.from(sub, {duration:0.3, opacity:0, y:-20,  ease:'back', stagger: 0.01 });
    }

}
</script>
