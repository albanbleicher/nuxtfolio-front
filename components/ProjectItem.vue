<template>
  <div class="project-item">
    <div class="illustration">
        <img :src="data.medias[2].formats.medium.url" alt="data.title">
    </div>
    <div class="informations">
        <span class='index'>{{index < 9 ? '0'+index : index}}</span>
      <h1>{{ data.title }}</h1>
      <hr />
      <p>{{ data.short_description }}</p>
    </div>
  </div>
</template>
<script>
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
    console.log(this.data)
  }
}
</script>
