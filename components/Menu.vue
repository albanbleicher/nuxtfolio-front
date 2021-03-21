<template>
    <div class="menu">
      <ul>
        <li><nuxt-link class="link" to='/projects'>Projects <sup>({{projectsCount}})</sup></nuxt-link></li>
        <li><nuxt-link class="link" to='/about'>About</nuxt-link></li>
        <li><nuxt-link class="link" to='/contact'>Contact</nuxt-link></li>
        <li><a target="blank" href="https://albchr.dev" class="link">Github</a></li>
    </ul>
    </div>
</template>
<script>
export default {
  props:['projectsCount']
}
</script>