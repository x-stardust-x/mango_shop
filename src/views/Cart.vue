<template>
    <div class="container m-auto">
        <h2 class="mb-4 text-center">購物車</h2>

        <h4 v-if="cartItems.length === 0" class="alert alert-info">
            購物車是空的。
        </h4>

        <div v-else>
            <table class="table table-bordered align-middle">
                <thead class="table-light">
                    <tr>
                        <th>品種</th>
                        <th>顆數</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th>小計</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in cartItems" :key="i">
                        <td>{{ item.name }}</td>
                        <td>{{ item.count }}</td>
                        <td>{{ item.price }} 元</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price * item.quantity }} 元</td>
                        <td>
                            <button class="btn btn-sm btn-danger" @click="removeItem(i)">刪除</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="4" class="text-end">總計：</th>
                        <th colspan="2">{{ cartTotal }} 元</th>
                    </tr>
                </tfoot>
            </table>

            <!-- 使用者資料表單 -->
            <div class="mb-3">
                <label for="name" class="form-label">姓名</label>
                <input id="name" type="text" class="form-control" v-model="name" placeholder="請輸入姓名" />
            </div>

            <div class="mb-3">
                <label for="phone" class="form-label">電話</label>
                <input id="phone" type="tel" class="form-control" v-model="phone" placeholder="請輸入電話" />
            </div>

            <div class="mb-3">
                <label for="address" class="form-label">地址</label>
                <input id="address" type="text" class="form-control" v-model="address" placeholder="請輸入地址" />
            </div>

            <div class="text-end">
                <button class="btn btn-primary" :disabled="!canCheckout" @click="checkout">
                    結帳
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
    setup() {
        const store = useStore();

        const cartItems = computed(() => store.getters.cartItems);
        const cartTotal = computed(() => store.getters.cartTotal);

        const name = ref("");
        const phone = ref("");
        const address = ref("");

        const canCheckout = computed(() => {
            return (
                cartItems.value.length > 0 &&
                name.value.trim() !== "" &&
                phone.value.trim() !== "" &&
                address.value.trim() !== ""
            );
        });

        const removeItem = (index: number) => {
            store.commit("REMOVE_ITEM", index);
        };

        const checkout = async () => {
            try {
                const orderData = {
                    customer: {
                        name: name.value,
                        phone: phone.value,
                        address: address.value,
                    },
                    items: cartItems.value,
                    total: cartTotal.value,
                };
                const res = await axios.post(
                    "https://mango-api-41pe.onrender.com/api/checkout",
                    orderData
                );
                alert(res.data.message || "結帳成功");
                store.commit("CLEAR_CART");
                name.value = "";
                phone.value = "";
                address.value = "";
            } catch (err) {
                alert("結帳失敗，請稍後再試");
                console.error(err);
            }
        };

        return {
            cartItems,
            cartTotal,
            name,
            phone,
            address,
            canCheckout,
            removeItem,
            checkout,
        };
    },
});
</script>
