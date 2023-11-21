import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useItemListStore = defineStore('itemList', () => {
  const itemList = ref([])
  const itemEntrance = ref(true)
  const selectedItem = ref(0)

  const add = (item) => {
    itemList.value.push(item)
  }

  const clear = () => {
    itemList.value = []
  }

  return { itemList, itemEntrance, selectedItem, add, clear }
})
