<template>
<div class="work">
    <Work v-for='(work, i) in works' :key='"work-element-"+i' :data="work"/>
</div>
</template>
<script>
import Work from '~/components/Work'
export default {
    async asyncData({$strapi}) {
        return {
            works:await $strapi.find('projects')
        }
    },
    components:{
        Work
    },
}
</script>