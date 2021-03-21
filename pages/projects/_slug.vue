<template>
        <div class="project-single" data-scroll-container ref='container'>
        <div ref="notice" class="notice">Scroll to learn more about {{current.title}}</div>
        <div class="header">
            <h1 data-scroll data-scroll-speed="1" ref="title">{{current.title}}</h1>
            <p data-scroll data-scroll-speed="4" ref="date" class="date">{{new Date(current.date).getFullYear()}}</p>
        </div>
        <div data-scroll-section class="content">
            <div class="images-top">
                <img v-for='index in 3' data-scroll :data-scroll-speed="index*4"  :key='"item-top-"+index' :src="current.medias[index-1].formats.large.url" :alt="current.title + ' Illustration n°'+index">
            </div>
            <p class='description'>{{current.description}}</p>
            <div class="two-sides">
                <div class="left-side">
                <img v-for='index in 3' :key='"item-top-"+index' :src="current.medias[3+index-1].formats.large.url" :alt="current.title + ' Illustration n°'+index">
                </div>
                <div class="right-side">
                    <div class="highlight-element purpose">
                        <span class="value">{{current.purpose}}</span>
                    </div>
                    <div class="highlight-element delay">
                        <span class="value">{{current.delay}}</span>
                    </div>
                    <div class="highlight-element context">
                        <span class="value">{{current.context}}</span>
                        </div>
                </div>
            </div>
            <div class="credits" v-html='current.credits'></div>

        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import gsap from 'gsap'
import SplitText from '@/utils/SplitText'
export default {
    async created() {
        await this.getProjectBySlug(this.$route.params.slug)
        console.log(this.current.credits)
    },
    computed:{
        ...mapGetters('projects', ['current'])
    },
    methods:{
        ...mapActions('projects',['getProjectBySlug']),
},
    mounted() {
             const split_header = new SplitText(this.$refs['title'])
    const chars_header = split_header.chars
    const split_date = new SplitText(this.$refs['date'])
    const chars_date = split_date.chars
    const timeline = gsap.timeline()
    timeline.from(chars_header, {duration:1, opacity:0, y:-20,  ease:"back", stagger: 0.06 });
    timeline.from(chars_date, {duration:0.8, opacity:0, y:-20,  ease:"back" });
    timeline.from(this.$refs['notice'], {duration:0.8, opacity:0,  ease:"back" });
    window.addEventListener('wheel', (e) => {
        gsap.to(this.$refs['notice'], {opacity:0})
    })
    }
}
</script>