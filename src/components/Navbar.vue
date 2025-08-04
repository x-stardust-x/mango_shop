<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fs-4">
        <div class="container">
            <router-link class="navbar-brand fs-4" to="/">芒果商店</router-link>

            <!-- 漢堡按鈕 -->
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item" v-for="(item, i) in navs" :key="i">
                        <router-link class="nav-link" :class="{active: item.path === $route.path}" :to="item.path">
                            <i class="bi" :class="item.icon"></i>
                            {{item.name}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .nav-link:hover{
        background-color: rgba(0, 255, 0, 0.2);
    }
    .nav-link.active{
        background-color: rgba(0, 255, 0, 0.4);
        font-weight: bold;
    }
    .nav-link.active:hover{
        background-color: rgba(0, 255, 0, 0.6);
    }
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        const navs = [
            { name: "首頁", path: "/" ,icon: "bi-house-fill"},
            { name: "關於我們", path: "/about" ,icon: "bi-people-fill"},
            { name: "商品", path: "/products" ,icon: "bi-bag-fill"},
            { name: "購物車", path: "/cart" ,icon: "bi-cart-fill"},
            { name: "會員", path: "/member" ,icon: "bi-person-circle"},
        ];


        return { navs };
    },
});
</script>
