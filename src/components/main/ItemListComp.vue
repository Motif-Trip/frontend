<script setup>
import ItemComp from '@/components/main/item/ItemComp.vue'

import { useItemListStore } from '@/stores/counter'
import { nextTick, ref, watch } from 'vue'

const itemListStore = useItemListStore()
const itemComps = ref([])
const prevSelectedItem = ref(null)
const hasNoItems = ref(false)

const setItemRef = (el, item) => {
  if (el) {
    itemComps.value[item.index] = el
  }
}

watch(
  () => itemListStore.isItemListLoaded,
  (newValue) => {
    hasNoItems.value = newValue
  }
)

watch(
  () => itemListStore.selectedItemComp,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      await nextTick()

      if (prevSelectedItem.value && prevSelectedItem.value.$el) {
        prevSelectedItem.value.$el.classList.add('box-shadow(0/0/5/#A4A4A4)')
        prevSelectedItem.value.$el.classList.remove('selected')
      }

      const selectedItemCompComp = itemComps.value[newValue]
      if (selectedItemCompComp && selectedItemCompComp.$el) {
        selectedItemCompComp.$el.classList.add('selected')
        selectedItemCompComp.$el.classList.remove('box-shadow(0/0/5/#A4A4A4)')

        const searchMenu = document.getElementById('search-menu')
        if (searchMenu) {
          const itemTop = selectedItemCompComp.$el.getBoundingClientRect().top
          const searchMenuTop = searchMenu.getBoundingClientRect().top
          searchMenu.scrollTop += itemTop - searchMenuTop * 1.15
        }

        prevSelectedItem.value = selectedItemCompComp
      }
    }
  }
)
</script>

<template>
  <div v-if="hasNoItems" class="z(1) layer(left:7%+top:8%)">
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
        @click="() => itemListStore.click(item)"
      />
    </div>
  </div>
  <div v-else class="z(2) layer w(100vw) h(100vh) pack">
    <div class="layer pack bg(#A6A6A6.6)">
      <div class="main">
        <div class="droplet_spinner">
          <div class="droplet"></div>
          <div class="droplet"></div>
          <div class="droplet"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected {
  color: #009adc;
  box-shadow: 0 0 7px 0 #009adc;
}

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

.main {
  width: 90vw;
  margin: 0 auto;
  text-align: center;
}

.droplet_spinner {
  display: flex;
  justify-content: center;
  margin: 30px;
}

.droplet_spinner .droplet {
  width: 15px;
  height: 15px;
  margin: 0 5px;

  background-color: #ffffff;
  border-radius: 50%;
  transform-origin: center bottom;

  animation: bounce 1.2s cubic-bezier(0.3, 0.01, 0.4, 1) infinite;
}

.droplet_spinner .droplet:nth-child(1) {
  animation-delay: -0.4s;
}

.droplet_spinner .droplet:nth-child(2) {
  animation-delay: -0.2s;
}

.droplet_spinner .droplet:nth-child(3) {
  animation-delay: 0s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
