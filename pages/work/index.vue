<template>
<div class="work">
    <Work v-for='(work, i) in workList' :key='"work-element-"+i' :data="work"/>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import Work from '~/components/Work'
export default {
    components:{
        Work
    },
    computed:{
        ...mapGetters('Work', ['workList']),
    },
    mounted() {
        console.log('ok')
        console.log(this.workList)
    }
}
</script>