<script setup>
import ItemComp from '@/components/main/item/ItemComp.vue'

import { useItemListStore } from '@/stores/counter'
import { nextTick, ref, watch } from 'vue'

const itemListStore = useItemListStore()
const itemComps = ref([])

const setItemRef = (el, item) => {
  console.log(el + ' / ' + item)
  if (el) {
    itemComps.value[item.index] = el
  }
}

watch(
  () => itemListStore.selectedItem,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      await nextTick()
      const selectedItemComp = itemComps.value[newValue]
      if (selectedItemComp && selectedItemComp.$el) {
        const searchMenu = document.getElementById('search-menu')
        if (searchMenu) {
          const itemTop = selectedItemComp.$el.getBoundingClientRect().top
          searchMenu.scrollTop = itemTop + searchMenu.scrollTop
        }
      }
    }
  }
)
</script>

<template>
  <div class="z(1) layer(left:7%+top:8%)">
    <div
      id="search-menu"
      class="vbox(top+center) gap(15) py(20) scroll-y no-scrollbar w(23vw) h(80vh) bg(white) r(25)"
    >
      <ItemComp
        v-for="item in itemListStore.itemList.values()"
        :key="item.name"
        :ref="(el) => setItemRef(el, item)"
        :class="{
          'slide-in-top': itemListStore.itemEntrance,
          'slide-out-bottom': !itemListStore.itemEntrance
        }"
        :item="item"
      />
    </div>
  </div>
</template>

<style scoped>
#search-menu {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 16px 0 #a4a4a4;
  border: 1px solid rgba(255, 255, 255, 0.18);
  scroll-behavior: smooth;
}

.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.slide-out-bottom {
  -webkit-animation: slide-out-bottom 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: slide-out-bottom 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@-webkit-keyframes slide-out-bottom {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
}
@keyframes slide-out-bottom {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0;
  }
}
</style>
