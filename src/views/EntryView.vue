<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SignupComp from '@/components/entry/SignupComp.vue'
import LoginComp from '@/components/entry/LoginComp.vue'
import IntroComp from '@/components/entry/IntroComp.vue'

const router = useRouter()
const isAccountExisting = ref(true)
const toggleAuthTitle = computed(() => {
  return isAccountExisting.value ? '로그인' : '회원가입'
})
</script>

<template>
  <div class="vbox h(100vh)">
    <div class="hbox justify-between h(8%) bg(#FFFFFF) bb(#CECECE)">
      <div class="w(20%) pack">사이트 소개</div>
      <div style="font-family: 'BM Jua'" class="w(20vw) pack font(24)">Motif</div>
      <div class="w(20%) pack gap(5)">
        <button
          id="login-btn"
          class="w(90) h(40) r(15) bg(#FFFFFF) c(#172040) b(#C3BCBC) hover:bg(#327AD9)+c(white)+font(20) transition(.3s)"
        >
          로그인
        </button>
        <button
          id="signup-btn"
          class="w(90) h(40) r(15) bg(#172040) c(white) hover:bg(#327AD9)+c(white)+font(20) transition(.3s)"
        >
          회원가입
        </button>
      </div>
    </div>
    <div class="hbox gap(10) pack bg(#f5f5f5) flex">
      <IntroComp />
      <div class="w(30vw) h(70vh) bg(white) b(#E1E1E1) gap(50) rr(20) vbox pack">
        <div id="signup-title" class="font(3.5vh) 600">{{ toggleAuthTitle }}</div>
        <form @click.prevent class="vbox gap(10) pack">
          <LoginComp
            v-if="isAccountExisting"
            @toggle-signup="() => (isAccountExisting = false)"
            @enter-main-view="() => router.push('/main')"
          />
          <SignupComp v-else @toggle-login="() => (isAccountExisting = true)" />
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
input,
select {
  border: 0;
}

#login-btn,
#signup-btn {
  font-family: 'BM Jua';
}

#signup-title {
  font-family: 'Nanum Gothic';
}
</style>
