<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Navbar />
    <Header />
    <div class="container-fluid m-auto p-3 flex-grow-1">
      <router-view />
    </div>
    <Footer />
    <transition name="fade">
      <button v-show="showButton" @click="scrollToTop" class="btn btn-warning scroll-top-btn fs-1"><i
        class=" bi bi-arrow-up-circle"></i></button>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  setup() {
    const showButton = ref(window.scrollY > 0 ? true : false);

    // 滾動事件處理
    const handleScroll = () => {
      showButton.value = window.scrollY > 0;
    };

    // 回頂端
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });
    return { showButton, scrollToTop }
  },
  components: {
    Navbar,
    Header,
    Footer
  }
})
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
}

.scroll-top-btn {
  position: fixed;
  width: auto;
  height: auto;
  bottom: 80px;
  right: 20px;
  z-index: 50;
}

/* 動畫進出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>
