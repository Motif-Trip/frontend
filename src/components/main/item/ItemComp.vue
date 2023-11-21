<script setup>
import { computed } from 'vue'

const colorCodes = [
  '#FF6363',
  '#699FFF',
  '#54C752',
  '#FFB869',
  '#A02CC7',
  '#F5518E',
  '#F57851',
  '#F55B50',
  '#F551F0',
  '#F59551',
  '#8C4EF5',
  '#F54EEC',
  '#C24FF4',
  '#564EF5',
  '#F54E89',
  '#5198F5',
  '#42C7BE',
  '#51B3CE',
  '#61C4B2',
  '#5164F5',
  '#B3B825',
  '#3FB829',
  '#84CF29',
  '#CFBC29',
  '#29CF50'
]

const props = defineProps({
  item: Object
})

const printCategory = computed(() => {
  return props.item.category.join(' | ')
})

const printTagBadge = computed(() => {
  return props.item.context.length > 0 ? props.item.context : props.item.category
})

const printBreakTime = computed(() => {
  const breakTime = props.item.status.businessHours
  const hasBreakTime =
    '영업시간 : ' +
    breakTime.substring(8, 10) +
    ':' +
    breakTime.substring(10, 12) +
    ' ~ ' +
    breakTime.substring(21, 23) +
    ':' +
    breakTime.substring(23, 25)
  return breakTime === '' ? '정보없음' : hasBreakTime
})

const getRandomColor = () => {
  return colorCodes[Math.floor(Math.random() * colorCodes.length)]
}
</script>

<template>
  <div
    class="vbox(top) py(10) w(85%) bg(white) r(25) box-shadow(0/0/5/#A4A4A4) hover:scale(1.03)+box-shadow(0/0/7/#009ADC) transition(.3s)"
  >
    <div class="vbox gap(8) p(5/20)">
      <div id="tag-badge" class="hbox(left) font(10) gap(3) scroll-x no-scrollbar">
        <button
          v-for="tagName in printTagBadge"
          :key="tagName"
          :style="{ backgroundColor: getRandomColor() }"
          style="font-family: 'BM Hanna Air'"
          class="p(3/7) r(30) c(white)"
        >
          #{{ tagName }}
        </button>
      </div>
      <div class="font(2vw) 700" style="font-family: 'BM Hanna Pro'">{{ item.name }}</div>
      <div class="font(0.8vw)">{{ printCategory }}</div>
      <div class="pack r(25) b(1/#E1E1E1) font(1vw) c(#CCCCCC) hover:c(#009ADC) transition(.3s)">
        {{ printBreakTime }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
