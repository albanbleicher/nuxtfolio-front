<template>
  <div class="index">
    <canvas ref="canvas"></canvas>
    <div class="main">
      <div class="header">
        <h1>Alban</h1>
        <p>Interactive developer student at Gobelins</p>
      </div>
      <ProjectInfos v-if="current" :key="current.title" :project="current" />
      <div class="footer">
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Github</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as THREE from 'three'
export default {
  computed: {
    ...mapGetters('Projects', ['projectList']),
  },
  data() {
    return {
      three: {},
      planes: [],
      current: null,
      end: 400,
      sizes: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }
  },
  mounted() {
    this.threeInit()
    console.log(this.projectList)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('wheel', this.handleScroll)
  },
  methods: {
    threeInit() {
      this.three.scene = new THREE.Scene()
      this.three.camera = new THREE.PerspectiveCamera(
        (75, this.sizes.width / this.sizes.height, 1, 100)
      )
      this.three.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs['canvas'],
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      this.three.renderer.setSize(this.sizes.width, this.sizes.height)
      this.three.camera.aspect = this.sizes.width / this.sizes.height
      this.three.camera.updateProjectionMatrix()

      this.three.camera.position.z = 15
      this.three.isInit = true
      this.threeAddProjects()
      const light = new THREE.AmbientLight(0xffffff, 1)
      this.three.scene.add(light)
      this.three.clock = new THREE.Clock()
      this.threeTick()
    },
    threeAddProjects() {
      this.projectList.forEach((project, index) => {
        const geometry = new THREE.PlaneGeometry(40, 30, 30, 20)
        const thumb = project.medias[0].url
        const loader = new THREE.TextureLoader()
        loader.load(thumb, (loaded) => {
          const aspectOfPlane = 40 / 30
          const aspectOfImage = loaded.image.width / loaded.image.height
          let yScale = 1
          let xScale = aspectOfPlane / aspectOfImage
          if (xScale > 1) {
            // it doesn't cover so based on x instead
            xScale = 1
            yScale = aspectOfImage / aspectOfPlane
          }
          loaded.repeat.set(xScale, yScale)
          loaded.offset.set((1 - xScale) / 2, (1 - yScale) / 2)
          var material = new THREE.ShaderMaterial({
            vertexShader: `
uniform vec2 uFrequency;
uniform float uTime;
varying vec2 vUv;


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - 0.4*uTime)*0.4;
    elevation += sin(modelPosition.y * uFrequency.y - 0.4*uTime)* 0.2;

    modelPosition.z += elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vUv = uv;

}
              `,
            fragmentShader: `
uniform sampler2D uTexture;
uniform float uOpacity;

varying vec2 vUv;

void main()
{   
    vec4 textureColor = texture2D(uTexture,vUv);
    textureColor.a = uOpacity;
    gl_FragColor = textureColor;
}
              `,
            uniforms: {
              uFrequency: {
                value: new THREE.Vector2(10, 5),
              },
              uTime: {
                value: 0,
              },
              uTexture: {
                value: loaded,
              },
              uOpacity:{
                value:1
              }
            },
            transparent:true
          })

          material.matrixAutoUpdate = false
          const plane = new THREE.Mesh(geometry, material)

          plane.position.x = -(index + 1) * 160
          plane.position.z = -34
          this.three.scene.add(plane)
          plane.custom_data = project
          this.end = (index + 1) * 54

          this.planes.push(plane)
        })
      })
    },
    threeTick() {
      window.requestAnimationFrame(this.threeTick)
      this.three.renderer.render(this.three.scene, this.three.camera)

      if (this.three.camera.position.z < -this.end + 20) {
        this.three.camera.position.z = 5
      }
      if (this.three.camera.position.z > 5) {
        this.three.camera.position.z = 5
      }

      this.planes.forEach((plane, i) => {
        const distance = this.three.camera.position.distanceTo(plane.position)
        if (distance > 30 && distance <= 80) {
          this.current = plane.custom_data
        }
        // if ((distance < 34) & (plane.material.uniforms.uOpacity.value > 0)) {
        //   plane.material.uniforms.uOpacity.value -= 0.07
        // }
        // if (distance > 34 && plane.material.uniforms.uOpacity.value < 1) {
        //   plane.material.uniforms.uOpacity.value += 0.07
        // }
        plane.material.uniforms.uTime.value = distance;
      })
    },
    handleResize() {
      if (this.three.isInit) {
        this.three.renderer.setSize(this.sizes.width, this.sizes.height)
        this.three.renderer.setPixelRatio(window.devicePixelRatio)
        this.three.camera.aspect = this.sizes.width / this.sizes.height
        this.three.camera.updateProjectionMatrix()
      }
    },
    handleScroll(e) {
      this.three.camera.position.x += e.deltaY * 0.1
    },
  },
}
</script>
