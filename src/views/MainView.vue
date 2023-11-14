<template>
  <div class="relative w(100vw) h(100vh)">
    <div ref="container" class="w(100%) h(100%)"></div>
    <SearchBarComp />
    <div class="z(1) layer(left:7%+top:8%)">
      <div id="search-menu" class="w(23vw) h(80vh) bg(white) r(25)"></div>
    </div>
    <TimeTableComp />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import SearchBarComp from '@/components/main/SearchBarComp.vue'
import TimeTableComp from '@/components/main/TimeTableComp.vue'

let map = null
const container = ref(null)

const loadScript = () => {
  const script = document.createElement('script')
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
    import.meta.env.VITE_KAKAOMAP_KEY
  }`
  script.addEventListener('load', () => kakao.maps.load(initMap))
  document.head.appendChild(script)
}

const initMap = () => {
  const options = {
    center: new kakao.maps.LatLng(37.5409583, 127.0684707),
    level: 3,
    maxLevel: 5
  }

  map = new kakao.maps.Map(container.value, options)
}

onMounted(() => {
  if (window.kakao?.maps) {
    console.log(`KakaoMapComp.vue - 이미 map 있음`, window.kakao.maps)
    initMap()
  } else {
    console.log(`KakaoMapComp.vue - map script loading 필요`)
    loadScript()
  }
})
</script>

<style scoped>
#search-menu {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 16px 0 #a4a4a4;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
