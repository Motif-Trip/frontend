<template>
  <div ref="container" class="w(100%) h(100%)"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  subject_query: String
})

const query = ref('맛집')
const map = ref(null)
const lat = ref(37.5409583)
const lng = ref(127.0684707)
const container = ref(null)
const count = ref(0)
const markers = ref([])
const clearMarkers = () => {
  markers.value.forEach((marker) => {
    marker.setMap(null)
  })
  markers.value = []
}
const itemList = []

const loadScript = () => {
  const script = document.createElement('script')
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
    import.meta.env.VITE_KAKAOMAP_KEY
  }`
  script.addEventListener('load', () => kakao.maps.load(rendering))
  document.head.appendChild(script)
}

const rendering = () => {
  const savedLat = localStorage.getItem('mapLat')
  const savedLng = localStorage.getItem('mapLng')

  const options = {
    center: new kakao.maps.LatLng(savedLat || lat.value, savedLng || lng.value),
    level: 3,
    maxLevel: 4
  }

  map.value = new kakao.maps.Map(container.value, options)
  kakao.maps.event.addListener(map.value, 'dragend', function () {
    const level = map.value.getLevel()
    const latlng = map.value.getCenter()
    lat.value = latlng.getLat()
    lng.value = latlng.getLng()

    // 상태를 localStorage에 저장
    localStorage.setItem('mapLat', lat.value)
    localStorage.setItem('mapLng', lng.value)

    getData()
  })
}

watch(
  () => props.subject_query,
  (newValue) => {
    if (newValue) {
      query.value = newValue
      clearMarkers()
      getData()
    }
  }
)

watch(
  () => count.value,
  (newValue) => {
    console.log(newValue)
    if (newValue >= 10) {
      clearMarkers()
      count.value = 0
    }
  }
)

const getData = () => {
  axios({
    method: 'get',
    url: import.meta.env.VITE_SEARCH_URL,
    params: {
      query: query.value,
      cond: `${localStorage.getItem('mapLng') || lng.value};${
        localStorage.getItem('mapLat') || lat.value
      }`
    }
  })
    .then(({ data }) => {
      console.log(data)
      for (const item of data.result.place.list) {
        const imgSrc = 'src/assets/images/icon/map-marker.png'
        const imgSize = new kakao.maps.Size(48, 48)
        const imgOption = { offset: new kakao.maps.Point(24, 48) }
        const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption)
        const position = new kakao.maps.LatLng(parseFloat(item.y), parseFloat(item.x))
        const marker = new kakao.maps.Marker({
          map: map.value,
          position: position,
          image: markerImg,
          clickable: true
        })

        const info = {
          name: item.name,
          category: [...item.category],
          address: item.address,
          status: item.businessStatus,
          hompage: item.hompage,
          microReview: item.microReview,
          placeReviewCount: item.placeReviewCount,
          reviewCount: item.reviewCount,
          tel: item.tel,
          thumUrls: item.thumUrls,
          x: item.x,
          y: item.y
        }

        itemList.push(info)
        markers.value.push(marker)
        kakao.maps.event.addListener(marker, 'click', () => {
          console.log(info)
          map.value.setLevel(2)
          map.value.panTo(position)
        })
      }
      count.value++
    })
    .catch((error) => {
      console.dir(error)
    })
}

onMounted(() => {
  if (window.kakao?.maps) {
    rendering()
  } else {
    loadScript()
    getData()
  }
})
</script>

<style scoped></style>
