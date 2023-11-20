<script setup>
import { ref } from 'vue'

const isActiveSearch = ref(false)
const word = ref('')

const emits = defineEmits(['SearchEnter'])

const search = ({ target, code }) => {
  if (!(code === 'Escape' || code === 'Enter')) {
    return
  }
  target.blur()
  isActiveSearch.value = false

  if (code === 'Enter') {
    emits('SearchEnter', word)
  }
}

const inputWord = ({ target }) => {
  word.value = target.value
}
</script>

<template>
  <div class="z(1) layer(top:15) pack">
    <div
      class="w(25vw) h(50px) relative bg(white) c(black) r(35) box-shadow(0/0/5/#A4A4A4) transition(.5s)"
      :class="isActiveSearch ? ['box-shadow(0/0/10/#808080)+w(30vw)'] : []"
    >
      <img
        src="@/assets/images/icon/search_icon.svg"
        alt="돋보기"
        class="w(20) h(20) absolute x(25) y(15)"
      />
      <input
        type="text"
        class="absolute x(center+1%) y(center) w(60%)"
        placeholder="어디로 놀러갈까!?"
        :value="word"
        @input="inputWord"
        @focus="isActiveSearch = true"
        @blur="isActiveSearch = false"
        @keyup="search"
      />
    </div>
    <img
      src="@/assets/images/icon/hamburger_icon.svg"
      alt="search-icon"
      class="absolute x(~25) w(48) h(48) hover:w(56)+h(56) transition(.5s)"
    />
  </div>
</template>

<style scoped>
input {
  border: none;
  background-color: white;
}

input:focus {
  border: none;
  outline: none;
}
</style>
