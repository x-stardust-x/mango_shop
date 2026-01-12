<template>
    <div class="container mt-5 mx-auto">
        <h2 class="mb-4">訂單管理</h2>

        <!-- 錯誤提示 -->
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <!-- 載入中 -->
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status"></div>
        </div>

        <!-- 訂單表格 -->
        <div v-else>
            <!-- 電腦版 -->
            <table class="table table-striped d-none d-md-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>姓名</th>
                        <th>電話</th>
                        <th>地址</th>
                        <th>訂單時間</th>
                        <th>訂單內容</th>
                        <th>總金額</th>
                        <th>狀態</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders" :key="order.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ order.name }}</td>
                        <td>{{ order.phone }}</td>
                        <td>{{ order.address }}</td>
                        <td>{{ formatOrderTime(order.created_at) }}</td>
                        <td>
                            <ul class="mb-0">
                                <li v-for="(item, i) in order.items" :key="i">
                                    {{ item.mango_type }} - {{ item.count }}粒 × {{ item.quantity }}
                                </li>
                            </ul>
                        </td>
                        <td>${{ order.total }}</td>
                        <td>
                            <span class="badge" :class="order.status ? 'bg-success' : 'bg-warning text-dark'">
                                {{ order.status ? "完成" : "處理中" }}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-success me-2" @click="complete(order.id)"
                                v-if="!order.status">
                                完成
                            </button>
                            <button class="btn btn-sm btn-warning me-2" @click="uncomplete(order.id)"
                                v-else="!order.status">
                                取消完成
                            </button>
                            <button class="btn btn-sm btn-danger" @click="remove(order.id)">
                                刪除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 手機版 -->
            <div class="d-block d-md-none">
                <div v-for="order in orders" :key="order.id" class="card mb-3">
                    <div class="card-header d-flex justify-content-between" @click="toggle(order.id)" style="cursor: pointer;">
                    <span>#{{ order.id }} {{ order.name }}</span>
                    <span>{{ formatOrderTime(order.created_at) }}</span>
                    </div>
                    <div v-show="expandedId === order.id" class="card-body">
                    <p><strong>電話:</strong> {{ order.phone }}</p>
                    <p><strong>地址:</strong> {{ order.address }}</p>
                    <p><strong>總金額:</strong> {{ order.total }}</p>
                    <p><strong>狀態:
                    <span class="badge" :class="order.status ? 'bg-success' : 'bg-warning text-dark'">
                        {{ order.status ? "完成" : "處理中" }}
                        </span>
                        </strong>
                    </p>
                    
                    <h6>商品明細：</h6>
                    <ul>
                        <li v-for="item in order.items" :key="order.id">
                        {{ item.mango_type }} {{ item.count }}粒 × {{ item.quantity }}
                        </li>
                    </ul>
                    <button class="btn btn-sm btn-success me-2" @click="complete(order.id)"
                                v-if="!order.status">
                                完成
                            </button>
                            <button class="btn btn-sm btn-warning me-2" @click="uncomplete(order.id)"
                                v-else="!order.status">
                                取消完成
                            </button>
                            <button class="btn btn-sm btn-danger" @click="remove(order.id)">
                                刪除
                            </button>
                    </div>
                </div>
            </div>
        </div>
        <router-link to="/member">
            <button class="btn btn-warning">返回</button>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import api from "@/api/axios";
import { formatOrderTime } from "@/utils/formatTime";

interface OrderItem {
    mango_type: string;
    count: number;
    quantity: number;
}

interface Order {
    id: number;
    name: string;
    phone: string;
    address: string;
    items: OrderItem[];
    total: number;
    created_at: string;
    status: boolean;
}

export default defineComponent({
    name: "AdminOrders",
    setup() {
        const orders = ref<Order[]>([]);
        const loading = ref(true);
        const error = ref("");
        const expandedId = ref<number | null>(null);

        // 取得訂單
        const fetchOrders = async () => {
            try {
                const res = await api.get("/admin/orders");
                orders.value = res.data;        
                console.log(res.data);
                
                console.log(orders.value);
            } catch (err: any) {
                error.value = "載入訂單失敗";
            } finally {
                loading.value = false;
            }
        };

        // 完成訂單
        const complete = async (id: number) => {
            if (!confirm("確定完成訂單？")) return;
            try {
                await api.put(`/admin/orders/${id}/complete`);
                fetchOrders();
            } catch (err) {
                error.value = "更新失敗";
            }
        };

        //改回未完成
        const uncomplete = async (id: number) =>{
            if(!confirm("改回未完成?")) return;
            try{
                await api.put(`/admin/orders/${id}/uncomplete`);
                fetchOrders();
            }
            catch(err){
                error.value = "更新失敗";
            }
        }

        // 刪除訂單
        const remove = async (id: number) => {
            if (!confirm("確定刪除訂單？")) return;
            try {
                await api.delete(`/admin/orders/${id}`);
                fetchOrders();
            } catch (err) {
                error.value = "刪除失敗";
            }
        };

        const toggle = (id: number) => {
            expandedId.value = expandedId.value === id ? null : id;
        };

        onMounted(fetchOrders);

        return { orders, loading, error, complete, uncomplete, remove, formatOrderTime, expandedId, toggle };
    },
});
</script>
