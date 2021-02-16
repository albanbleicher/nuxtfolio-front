<template>
    <div class="menu">
      <ul>
        <li><nuxt-link class="link" to='/projects'>projects <sup>({{projectsCount}})</sup></nuxt-link></li>
        <li><nuxt-link class="link" to='/about'>about</nuxt-link></li>
        <li><nuxt-link class="link" to='/contact'>contact</nuxt-link></li>
    </ul>
    </div>
</template>
<script>
export default {
  props:['projectsCount']
}
</script>