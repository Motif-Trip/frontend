<script setup></script>

<template>
  <div class="vbox gap(30)">
    <div id="email-form" class="input-container">
      <input type="text" id="input" required="" />
      <label for="input" class="label">이메일</label>
      <div class="underline"></div>
    </div>
    <div id="password-form" class="input-container">
      <input type="password" id="input" required="" />
      <label for="input" class="label">비밀번호</label>
      <div class="underline"></div>
    </div>
  </div>
  <button
    id="login-btn"
    class="w(18vw) h(40) r(25) bg(#172040) c(white) mt(5vh) mb(1vh) hover:bg(#327AD9)+c(white)+font(20) transition(.3s)"
    @click="$emit('EnterMainView')"
  >
    로그인
  </button>
  <div
    @click="$emit('ToggleSignup')"
    class="c(gray) font(1vw) underline hover:font(1.2vw) transition(.3s)"
  >
    아직 Motif:모티브 계정이 없으신가요?
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
