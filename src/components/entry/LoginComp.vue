<script setup></script>

<template>
  <div class="hbox w(20vw) bb(2/#E1E1E1) c(#999799)">
    <input type="text" class="w(50%) h(3vh) px(10)" placeholder="이메일" />
    <div class="w(10%)">@</div>
    <select class="w(40%) h(3vh) px(10)" name="domain">
      <option value="naver.com">naver.com</option>
      <option value="google.com">google.com</option>
      <option value="daum.net">daum.net</option>
    </select>
  </div>
  <div class="w(20vw) bb(2/#E1E1E1) c(#999799)">
    <input type="password" class="w(100%) h(3vh) px(10)" placeholder="비밀번호" />
  </div>
  <button
    id="login-btn"
    class="w(18vw) h(40) r(25) bg(#172040) c(white) mt(3vh) hover:bg(#327AD9)+c(white)+font(20) transition(.3s)"
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
input,
select {
  border: 0;
}

#login-btn {
  font-family: 'BM Jua';
}
</style>
