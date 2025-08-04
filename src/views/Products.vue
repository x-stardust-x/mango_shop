<template>
    <div class="container m-auto">
        <h2 class="mb-4 text-center">選購芒果</h2>

        <div class="row">
            <div class="col-md-4 mb-4" v-for="(product, i) in products" :key="i">
                <div class="card h-100">
                    <img :src="product.img" class="card-img-top object-fit-cover" :alt="product.name"
                        style="height: 300px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ product.name }}</h5>

                        <!-- 顆數選擇 -->
                        <label class="form-label">選擇顆數</label>
                        <select class="form-select mb-2" v-model="selectedVariants[i].count">
                            <option v-for="variant in product.variants" :key="variant.count" :value="variant.count">
                                {{ variant.count }} 顆 - {{ variant.price }} 元
                            </option>
                        </select>

                        <!-- 購買數量 -->
                        <label class="form-label">數量(最多4箱)?</label>
                        <!-- ? 移到上面有tip -->
                        <div class="input-group mb-3">
                            <input type="number" class="form-control" min="0" max="4"
                                v-model.number="selectedVariants[i].quantity" />
                            <span class="input-group-text">箱</span>
                        </div>
                        <!-- 加入購物車 -->
                        <div class="mb-2">
                            <strong>總價：{{ Sum[i] }}</strong>
                        </div>
                        <div :style="{ cursor: selectedVariants[i].quantity == 0 ? 'not-allowed' : 'pointer' }">
                            <button class="btn btn-success w-100" :disabled="selectedVariants[i].quantity == 0"
                                @click="addToCart(i)">
                                加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { CartItem } from '@/store'

interface Variant {
    count: number
    price: number
}

interface Product {
    name: string
    img: string
    variants: Variant[]
}

export default defineComponent({
    setup() {
        const products = ref<Product[]>([
            {
                name: '愛文芒果',
                img: require('@/assets/AMango.jpg'),
                variants: [
                    { count: 12, price: 1200 },
                    { count: 15, price: 1050 },
                    { count: 18, price: 900 },
                    { count: 20, price: 750 },
                    { count: 24, price: 600 }
                ]
            },
            {
                name: '金黃芒果',
                img: require('@/assets/BMango.jpg'),
                variants: [
                    { count: 12, price: 1100 },
                    { count: 15, price: 1000 },
                    { count: 18, price: 900 },
                    { count: 20, price: 800 },
                    { count: 24, price: 700 }
                ]
            },
            {
                name: '凱特芒果',
                img: require('@/assets/CMango.jpg'),
                variants: [
                    { count: 12, price: 1000 },
                    { count: 15, price: 950 },
                    { count: 18, price: 900 },
                    { count: 20, price: 850 },
                    { count: 24, price: 800 }
                ]
            }
        ])

        // 每個商品的選擇（預設顆數與數量）
        const selectedVariants = ref(
            products.value.map(p => ({
                count: p.variants[0].count,
                quantity: 0
            }))
        )
        const Sum = computed(() => {
            return products.value.map((product, index) => {
                const selected = selectedVariants.value[index]
                const variant = product.variants.find(v => v.count === selected.count)
                if (variant && selected.quantity > 0) {
                    return variant.price * selected.quantity
                }
                return 0
            })
        })

        const store = useStore()

        const addToCart = (index: number) => {
            const product = products.value[index]
            const selected = selectedVariants.value[index]
            const variant = product.variants.find(v => v.count === selected.count)

            if (variant && selected.quantity > 0) {
                const item: CartItem = {
                    name: product.name,
                    count: variant.count,
                    price: variant.price,
                    quantity: selected.quantity
                }
                store.dispatch('addToCart', item)
                alert(`已加入購物車：${item.name} ${item.count}顆 × ${item.quantity}`)
                selected.quantity = 0 // 清空數量
            }
        }

        return {
            products,
            selectedVariants,
            Sum,
            addToCart
        }


    }
})
</script>
