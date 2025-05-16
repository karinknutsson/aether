<template>
  <div class="navbar-container">
    <button class="nav">About</button>
    <span class="meddon-capital">æ</span><span class="meddon-lowercase">ther</span>
    <button class="nav">Suggest a place</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
button.nav {
  background: transparent;
  border: 0;
  font-size: 20px;
  font-weight: 600;
  // text-transform: uppercase;
  color: $deep-blue;
  // font-style: italic;
  background: white;
  padding: 16px 40px;
}

.navbar-container {
  z-index: 200000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  padding: 0 4vw;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
</style>
