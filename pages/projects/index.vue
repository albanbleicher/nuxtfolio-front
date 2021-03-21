<template>
    <div class="projects">
        <ProjectItem :index='current+1' :key='current+1'  :data='projectList[current]'/>
        <span class="notice" ref='notice'>Scroll to browse through projects</span>
        <div class="dots">
            <div v-for='item in projectList.length' :key='item' :class="current+1 === item ? 'active dot' : 'dot'"></div>
        </div>
    </div>
</template>
<script>
import ProjectItem from '@/components/ProjectItem'
import { mapGetters } from 'vuex'
import SplitText from '@/utils/SplitText'
import gsap from 'gsap'
export default {
    components: { ProjectItem },
    data() {
        return {
            current:0,
            isChanging:false,
        }
    },
    created() {
        window.addEventListener('wheel', (e) => {
            if(e.deltaY>20 && this.isChanging === false) {
            gsap.to(this.$refs['notice'], {opacity:0, y:100, duration:1})

                this.isChanging=true;
                if(this.current !== this.projectList.length-1) {
                    this.current++
                }
                else {
                    this.current = 0
                }
                setTimeout(() => {
                    this.isChanging=false
                }, 3000)
            }
            if(e.deltaY < -40 && this.isChanging === false) {
            gsap.to(this.$refs['notice'], {opacity:0, duration:1})

                this.isChanging=true;
                if(this.current !== 0) {
                    this.current--
                }
                else {
                    this.current = this.projectList.length-1
                }
                setTimeout(() => {
                    this.isChanging=false
                }, 3000)
            }
        })
    },
    computed:{
        ...mapGetters('projects',['projectList']),
    },
    mounted() {
        setTimeout(() => {
            const notice = new SplitText(this.$refs['notice'])
            gsap.to(notice, {opacity:1, duration:0.8, stagger:0.2})
        }, 3000)
    },
}
</script>