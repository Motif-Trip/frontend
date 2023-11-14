<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const titleList = ref([
  '"오늘은 맛집 탐방!?( ˃ ⩌˂)"',
  '"롯데월드는 그만...(¬_¬)"',
  '"아까 그 떡볶이...츄릅( ᵕ̤ ‧̫̮ ᵕ̤ )"',
  '"추운 날엔 역시 만화카페ദ്ദി ˃᷄˶˶̫˶˂᷅ ) "',
  '"사랑의 자물쇠,,남산타워。˃̵͈̑ᴗ❛。"',
  '"카페에서 달달한 디저트!ꈍ .̮ ꈍ"',
  '"감성 가득 북카페 여행(๑•̀ – •́)و"',
  '"갤러리, 예술에 빠져볼까?(˶˚ ᗨ ˚˶)"',
  '"바삭바삭, 맥주와 치킨의 밤ᖛ◞ ᖛ',
  '"밤바다 보러 갈까( ˘ ³˘)♥?"'
])
const curTitle = ref('')
let idx = 1
let intervalId = null

const updateString = () => {
  curTitle.value = titleList.value[idx % titleList.value.length]
  idx++
}

onMounted(() => {
  curTitle.value = titleList.value[0]
  intervalId = setInterval(updateString, 2000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="w(35vw) h(70vh) bg(white) b(#E1E1E1) rl(20) vbox pack">
    <img src="@/assets/images/MOTIF_LOGO_1.png" alt="모티브_로고1" class="w(23vw)" />
    <div id="intro-title" class="font(2.3vw)">{{ curTitle }}</div>
    <div id="intro-subtitle" class="w(23vw) font(0.8vw) mt(1vh) text(center)">
      Motif 모티브는 바쁜 일상 속에서도 짧고 알찬 여행을 즐기고 싶은 이들을 위한 당일치기 여행 계획
      서비스입니다. 사용자의 취향, 시간, 예산을 고려하여 최적의 여행 경로와 활동을 제안합니다.
    </div>
  </div>
</template>

<style scoped>
#intro-title {
  font-family: 'BM Yeonsung';
}

#intro-subtitle {
  font-family: 'BM Hanna Air';
}
</style>
