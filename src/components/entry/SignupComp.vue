<script setup>
import { computed, ref, watch } from 'vue'

const validation = ref({
  passwordValid: '',
  emailValid: '',
  nicknameValid: ''
})
const passwordCheck = ref('')
const form = ref({
  email: '',
  password: '',
  nickname: ''
})

watch([() => form.value.password, () => passwordCheck.value], ([newPassword, newPasswordCheck]) => {
  validation.value.passwordValid =
    newPassword === newPasswordCheck ? '' : '비밀번호가 일치하지 않습니다.'
})

watch(
  () => form.value.email,
  (newEmail) => {
    const emailRegex = /\S+@\S+\.\S+/
    validation.value.emailValid = emailRegex.test(newEmail)
      ? ''
      : '유효하지 않은 이메일 주소입니다.'
  }
)

watch(
  () => form.value.nickname,
  (newValue) => {
    if (newValue.length >= 3 && newValue.length < 20) {
      validation.value.nicknameValid = ''
    } else {
      validation.value.nicknameValid = '닉네임은 3자 이상 20자 미만이어야 합니다.'
    }
  }
)
</script>

<template>
  <div class="vbox gap(15) pack">
    <div id="email-form" class="input-container">
      <input v-model="form.email" type="text" id="input" required="" />
      <label for="input" class="label">이메일</label>
      <div class="underline"></div>
    </div>
    <div class="font(12) c(red)">{{ validation.emailValid }}</div>
    <div id="password-form" class="input-container">
      <input v-model="form.password" type="password" id="input" required="" />
      <label for="input" class="label">비밀번호</label>
      <div class="underline"></div>
    </div>
    <div class="font(12) c(red)">{{ validation.passwordValid }}</div>
    <div id="password-check-form" class="input-container">
      <input v-model="passwordCheck" type="password" id="input" required="" />
      <label for="input" class="label">비밀번호 확인</label>
      <div class="underline"></div>
    </div>
    <div class="font(12) c(red)">{{ validation.passwordValid }}</div>
    <div id="nickname-form" class="input-container">
      <input v-model="form.nickname" type="text" id="input" required="" />
      <label for="input" class="label">닉네임</label>
      <div class="underline"></div>
    </div>
    <div class="font(12) c(red)">{{ validation.nicknameValid }}</div>
  </div>
  <button
    id="signup-btn"
    class="w(18vw) h(40) r(25) bg(#172040) c(white) mt(2vh) mb(1vh) hover:bg(#327AD9)+c(white)+font(20) transition(.3s)"
  >
    가입하기
  </button>
  <div
    @click="$emit('ToggleLogin')"
    class="c(gray) font(1vw) underline hover:font(1.2vw) transition(.3s)"
  >
    이미 아이디가 존재하신가요?
  </div>
</template>

<style scoped>
.input-container {
  position: relative;
  margin: 1vh 1vh 0 1vh;
  width: 22vw;
}

.input-container input {
  font-size: 1.5vw;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  background-color: transparent;
  outline: none;
}

.input-container .label {
  position: absolute;
  top: 0;
  left: 0;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container input:focus ~ .label,
.input-container input:valid ~ .label {
  top: -20px;
  font-size: 10px;
  color: #333;
}

.input-container .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #333;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.input-container input:focus ~ .underline,
.input-container input:valid ~ .underline {
  transform: scaleX(1);
}
</style>
