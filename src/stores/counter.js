import { ref } from 'vue'
import { defineStore } from 'pinia'

const useItemListStore = defineStore('itemList', () => {
  const itemList = ref([])
  const itemEntrance = ref(true)
  const selectedItemComp = ref(0)
  const clickedItem = ref(null)
  const isItemListLoaded = ref(false)

  const add = (item) => {
    itemList.value.push(item)
  }

  const clear = () => {
    itemList.value = []
  }

  const click = (item) => {
    selectedItemComp.value = item.index
    clickedItem.value = item
  }

  return {
    itemList,
    itemEntrance,
    selectedItemComp,
    clickedItem,
    isItemListLoaded,
    add,
    clear,
    click
  }
})

export { useItemListStore }
