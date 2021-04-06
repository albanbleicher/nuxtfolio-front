<template>
    <div @mouseenter='animate' @mouseleave="fade" class="work-element">
        <div class="content">
            <h2 ref="title">{{data.title}} <small>(exp)</small></h2>
            <span ref="date" class="date">{{$moment(data.date).format('MMM. YYYY')}}</span>
            <p ref="description">{{data.short_description}}</p>
            <div ref="read" class="read" >
            <NuxtLink :to='"/work/"+data.slug'>Read</NuxtLink>
            </div>
        </div>
        <img ref="img" :src="data.medias[0].formats.large.url" alt="Venus">
    </div>
</template>
<script>
import gsap from 'gsap'
import SplitText from '~/utils/SplitText'

export default {
    props:['data'],
    mounted() {
        console.log(this.data)
    },
    methods:{
        animate() {
            const timeline = gsap.timeline()
            const description = new SplitText(this.$refs['description'])
            timeline.to(this.$refs['title'], {opacity:1, duration:0},0)
            timeline.to(this.$refs['img'], {filter:'grayscale(0)', duration:.5},0)
            timeline.from(this.$refs['title'], {opacity:0, duration:0.2,},0)
            timeline.to(this.$refs['description'], {opacity:1, duration:0},0)
            timeline.from(description.lines, {opacity:0, y:15, duration:0.2, stagger:0.02},0)
            timeline.to(this.$refs['read'], {opacity:1, duration:0},0)
            timeline.from(this.$refs['read'], {opacity:0, y:15, duration:0.5},0)

        },
        fade() {
            gsap.to(this.$refs['title'], {opacity:0, duration:0.2})
            gsap.to(this.$refs['description'], {opacity:0, duration:0.2})
            gsap.to(this.$refs['read'], {opacity:0, duration:0.2})
            gsap.to(this.$refs['img'], {filter:'grayscale(1)', duration:.2})
        }
    }
}
</script>