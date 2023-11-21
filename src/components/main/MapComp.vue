<template>
  <div ref="container" class="w(100%) h(100%)"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useItemListStore } from '@/stores/counter'
import axios from 'axios'

const itemListStore = useItemListStore()
const props = defineProps({
  subject_query: String
})

const container = ref(null)
const map = ref(null)
const lat = ref(37.5409583)
const lng = ref(127.0684707)
const markers = ref([])
const query = ref('맛집')
const moveToFirstMarker = ref(false)
let activeMarker = null

const clearMarkers = () => {
  markers.value.forEach((marker) => {
    marker.setMap(null)
  })
  markers.value = []
}

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

  kakao.maps.event.addListener(map.value, 'dragstart', () => {
    itemListStore.itemEntrance = false
  })

  kakao.maps.event.addListener(map.value, 'dragend', () => {
    const latlng = map.value.getCenter()
    lat.value = latlng.getLat()
    lng.value = latlng.getLng()
    clearMarkers()
    getData()
  })
}

watch(
  () => props.subject_query,
  (newValue, oldValue) => {
    query.value = newValue
    clearMarkers()
    moveToFirstMarker.value = true
    getData()
  }
)

const getData = () => {
  itemListStore.clear()
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
        // 일반 마커 - 반투명
        const normalImage = new kakao.maps.MarkerImage(
          import.meta.env.VITE_DISABLED_MARKER_IMG,
          new kakao.maps.Size(48, 48),
          {
            offset: new kakao.maps.Point(24, 48)
          }
        )

        // 호버 마커 - 파란색
        const hoverImage = new kakao.maps.MarkerImage(
          import.meta.env.VITE_ENABLED_MARKER_IMG,
          new kakao.maps.Size(64, 64),
          {
            offset: new kakao.maps.Point(32, 64)
          }
        )

        const position = new kakao.maps.LatLng(parseFloat(item.y), parseFloat(item.x))

        // 마커 생성 부분
        const marker = new kakao.maps.Marker({
          map: map.value,
          position: position,
          image: normalImage,
          clickable: true
        })

        const info = {
          index: item.index,
          name: item.name,
          category: [...item.category],
          context: [...item.context],
          address: item.address,
          status: item.businessStatus,
          hompage: item.hompage,
          microReview: item.microReview,
          placeReviewCount: item.placeReviewCount,
          reviewCount: item.reviewCount,
          tel: item.tel,
          thumUrls: item.thumUrls,
          x: item.x,
          y: item.y,
          marker: marker
        }

        kakao.maps.event.addListener(marker, 'click', () => {
          // 이전에 활성화된 마커가 있으면 이미지를 normalImage로 변경
          if (activeMarker) {
            activeMarker.setImage(normalImage)
          }

          // 현재 클릭된 마커를 활성화된 마커로 설정하고 이미지 변경
          marker.setImage(hoverImage)
          activeMarker = marker

          console.log(info)
          map.value.panTo(position)
          itemListStore.selectedItem = info.index
        })

        itemListStore.add(info)
        markers.value.push(marker)
      }

      if (moveToFirstMarker.value && markers.value.length > 0) {
        map.value.panTo(
          markers.value[Math.floor(Math.random() * markers.value.length)].getPosition()
        )
        moveToFirstMarker.value = false
      }

      itemListStore.itemEntrance = true
      localStorage.setItem('mapLat', lat.value)
      localStorage.setItem('mapLng', lng.value)
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
