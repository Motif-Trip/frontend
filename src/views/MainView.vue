<template>
  <div class="relative w(100vw) h(100vh)">
    <!-- Background : 카카오맵  -->
    <MapComp :subject_query="subject_query" />
    <!-- Top Center : 검색창  -->
    <SearchBarComp @SearchEnter="search" />
    <!-- LeftSide : 검색 결과 아이템 리스트  -->
    <SearchResult :itemList="itemList" />
    <button class="z(1) absolute x(center) y(~12vh) bg(white) r(25) w(10vw) h(5vh) b(1/black)">
      강남역으로 이동
    </button>
    <!-- Bottom : 타임테이블  -->
    <TimeTableComp />
  </div>
</template>

<script setup>
import SearchBarComp from '@/components/main/SearchBarComp.vue'
import TimeTableComp from '@/components/main/TimeTableComp.vue'
import MapComp from '@/components/main/MapComp.vue'
import SearchResult from '@/components/main/SearchResult.vue'
import { ref } from 'vue'

const itemList = ref([])
const subject_query = ref('')
const search = ({ value }) => {
  subject_query.value = value
  console.log(subject_query.value)
}
</script>

<style scoped></style>
