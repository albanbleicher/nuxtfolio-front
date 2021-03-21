<template>
  <div class="project-item">
    <div class="illustration">
        <img ref="image" :src="data.medias[0].formats.medium.url" alt="data.title">
    </div>
    <div class="informations">
        <span ref='index' class='index'>{{index < 9 ? '0'+index : index}}</span>
      <h1 :style='"color:"+data.color' ref="title">{{ data.title }}</h1>
      <p class="description" ref="description">{{ data.short_description }}</p>
      <!-- <img @click="$router.push('/projects/'+data.slug)" ref='icon' src="@/assets/icons/arrow-right.svg" alt="read more"> -->
    </div>
  </div>
</template>
<script>
import gsap from 'gsap'
import SplitText from '@/utils/SplitText'
export default {
  props: {
    data: {
      type: Object
    },
    index: {
        type: Number
    }
  },
  mounted() {
    this.handleAppear()
  },

  methods:{
    handleAppear() {
      const split_header = new SplitText(this.$refs['title'])
    const chars_header = split_header.chars
    const split_index = new SplitText(this.$refs['index'])
    const chars_index = split_index.chars
    const timeline = gsap.timeline()
    timeline.from(chars_index, {duration:0.4, opacity:0, y:-20,  ease:"back", stagger: 0.4 });
    timeline.from(chars_header, {duration:1, opacity:0, y:-20,  ease:"back", stagger: 0.06 });
    timeline.from(this.$refs['description'], {duration:2, opacity:0,  ease:"back" }, "-=0.5");
    timeline.from(this.$refs['image'], {duration:1, opacity:0 }, "-=2");
    },
  },
}
</script>
