<script setup>
import { computed, ref, watch } from 'vue'

const local = ref('')
const domain = ref('naver.com')
const email = computed(() => {
  return local.value + '@' + domain.value
})

const memberForm = ref({
  email: email,
  password: '',
  username: '',
  nickname: ''
})

const isValid = ref({
  email_error: false,
  password_error: false,
  password_verification_error: false,
  username_error: false,
  nickname_error: false
})

watch(local, (newValue) => {
  if (newValue === '') {
    isValid.value.email_error = false
  }
})
</script>

<template>
  <div class="vbox w(20vw)">
    <div
      class="hbox bb(2/#E1E1E1) c(#B3B1B3)"
      :class="{ 'bb(2/#E14C3B) c(#E14C3B)': isValid.email_error }"
    >
      <input v-model="local" type="text" class="w(50%) h(3vh) px(10)" placeholder="이메일" />
      <div class="w(10%)">@</div>
      <select v-model="domain" class="w(40%) h(3vh) px(10)">
        <option value="naver.com" selected>naver.com</option>
        <option value="google.com">google.com</option>
        <option value="daum.net">daum.net</option>
      </select>
    </div>
    <div v-show="isValid.email_error" class="font(10) c(red) p(5) pack">
      이미 존재하는 이메일입니다.
    </div>
  </div>
  <div class="vbox w(20vw)">
    <div
      class="bb(2/#E1E1E1) c(#B3B1B3)"
      :class="{ 'bb(2/#E14C3B) c(#E14C3B)': isValid.password_error }"
    >
      <input
        v-model="memberForm.password"
        type="password"
        class="w(100%) h(3vh) px(10)"
        placeholder="비밀번호"
      />
    </div>
    <div v-show="isValid.password_error" class="font(10) c(red) p(5) pack">
      비밀번호는 최소 8자 이상 숫자,영문자,특수문자를 입력해 주세요.
    </div>
  </div>
  <div class="vbox w(20vw)">
    <div
      class="bb(2/#E1E1E1) c(#B3B1B3)"
      :class="{ 'bb(2/#E14C3B) c(#E14C3B)': isValid.password_verification_error }"
    >
      <input type="password" class="w(100%) h(3vh) px(10)" placeholder="비밀번호 확인" />
    </div>
    <div v-show="isValid.password_verification_error" class="font(10) c(red) p(5) pack">
      비밀번호가 일치하지 않습니다.
    </div>
  </div>
  <div class="vbox w(20vw)">
    <div
      class="bb(2/#E1E1E1) c(#B3B1B3)"
      :class="{ 'bb(2/#E14C3B) c(#E14C3B)': isValid.username_error }"
    >
      <input
        :value="memberForm.username"
        @input="(event) => (memberForm.username = event.target.value)"
        type="text"
        class="w(100%) h(3vh) px(10)"
        placeholder="이름"
      />
    </div>
    <div v-show="isValid.username_error" class="font(10) c(red) p(5) pack">
      이름은 한글, 영문자를 입력해 주세요.
    </div>
  </div>
  <div class="vbox w(20vw)">
    <div
      class="bb(2/#E1E1E1) c(#B3B1B3)"
      :class="{ 'bb(2/#E14C3B) c(#E14C3B)': isValid.nickname_error }"
    >
      <input
        :value="memberForm.nickname"
        @input="(event) => (memberForm.nickname = event.target.value)"
        type="text"
        class="w(100%) h(3vh) px(10)"
        placeholder="닉네임"
      />
    </div>
    <div v-show="isValid.nickname_error" class="font(10) c(red) p(5) pack">
      이미 존재하는 닉네임입니다.
    </div>
  </div>
  <button
    id="signup-btn"
    class="w(18vw) h(40) r(25) bg(#172040) c(white) mt(2vh) hover:bg(#327AD9)+c(white)+font(20) transition(.3s)"
  >
    가입하기
  </button>
  <div
    @click="$emit('ToggleLogin')"
    class="c(gray) font(14) underline hover:font(18) transition(.3s)"
  >
    이미 아이디가 존재하신가요?
  </div>
</template>

<style scoped>
input,
select {
  border: 0;
}

#signup-btn {
  font-family: 'BM Jua';
}
</style>
