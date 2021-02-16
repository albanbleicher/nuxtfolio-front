<template>
    <div class="projects">
        <ProjectItem :index='current+1'  :data='projectList[current]'/>
    </div>
</template>
<script>
import ProjectItem from '@/components/ProjectItem'
import { mapGetters } from 'vuex'
export default {
    components: { ProjectItem },
    data() {
        return {
            current:0
        }
    },
    created() {
        console.log(this.projectList)
        window.addEventListener('wheel', (e) => {
            e.preventDefault()
        })
    },
    computed:{
        ...mapGetters('projects',['projectList']),
    }
}
</script>