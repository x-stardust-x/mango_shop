<template>
  <header class="bg-warning text-white py-3 text-center">
    <h1 class="text-black">歡迎來到芒果商店！</h1>
  </header>
  <div class="text-center pb-3">
    <img :src="mangoBar" class="img-fluid rounded" alt="mango banner">
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      mangoBar: require('@/assets/mangoBar.jpg')
    }
  }
}
</script>
