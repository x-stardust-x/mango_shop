<template>
    <div class="container mt-5">
        <h2 class="mb-4">帳號管理</h2>

        <!-- 錯誤提示 -->
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <!-- 載入中 -->
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-primary" role="status"></div>
        </div>

        <!-- 帳號表格 -->
        <table v-else class="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>名稱</th>
                    <!-- <th>Email</th> -->
                    <th>管理員</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.username }}</td>
                    <!-- <td>{{ user.email }}</td> -->
                    <td>
                        <span class="badge" :class="user.admin ? 'bg-success' : 'bg-secondary'">
                            {{ user.admin ? "是" : "否" }}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2" @click="toggleAdmin(user.id, !user.admin)">
                            {{ user.admin ? "取消管理員" : "設為管理員" }}
                        </button>
                        <button class="btn btn-sm btn-danger" @click="remove(user.id)">
                            刪除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/member">
            <button class="btn btn-warning">返回</button>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import api from "@/api/axios";

interface User {
    id: number;
    username: string;
    // email: string;
    admin: boolean;
}

export default defineComponent({
    name: "AdminAccounts",
    setup() {
        const users = ref<User[]>([]);
        const loading = ref(true);
        const error = ref("");

        // 取得帳號
        const fetchUsers = async () => {
            try {
                const res = await api.get("/admin/accounts");
                users.value = res.data;         
            } catch (err: any) {
                error.value = "載入帳號失敗";
            } finally {
                loading.value = false;
            }
        };

        // 切換 admin 權限
        const toggleAdmin = async (id: number, newStatus: boolean) => {
            try {
                await api.put(`/admin/accounts/${id}`, { admin: newStatus });
                fetchUsers();
            } catch (err) {
                error.value = "更新權限失敗";
            }
        };

        // 刪除使用者
        const remove = async (id: number) => {
            if (!confirm("確定刪除帳號？")) return;
            try {
                await api.delete(`/admin/accounts/${id}`);
                fetchUsers();
            } catch (err) {
                error.value = "刪除失敗";
            }
        };

        onMounted(fetchUsers);

        return { users, loading, error, toggleAdmin, remove };
    },
});
</script>
