<template>
    <div class="container mx-auto my-2">
        <div class="text-center">
            <h2>關於我們</h2>
            <p>我們是專門銷售台灣頂級芒果的農場直送品牌。</p>
            <h2 class="mt-4">熱門商品</h2>
        </div>
        <div class="row">
            <div class="col-md-4" v-for="(item, i) in products" :key="i">
                <div class="card mb-3 h-100">
                    <img :src="item.img" class="card-img-top object-fit-cover" :alt="item.name" style="height: 300px;">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}<i class="bi bi-question-circle px-1"></i></h5>
                        <p class="card-text">從 {{ item.price }} 元起</p>
                        <router-link to="/products">
                            <button class="btn btn-info w-100">
                                點擊前往購買
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const products = [
            { name: '愛文芒果', img: require('@/assets/AMango.jpg'), price: 600 },
            { name: '金黃芒果', img: require('@/assets/BMango.jpg'), price: 700 },
            { name: '凱特芒果', img: require('@/assets/CMango.jpg'), price: 800 },
        ]
        return { products }
    }
})
</script>
