<template>
    <div class="container mx-auto my-2">
        <h2 class="my-4">會員資料</h2>
        <h3 v-if="username" class="my-4">名子:{{ username }}</h3>
        <h3 v-else>載入中...</h3>
        <div class="fs-4 my-3">會員:
            <span v-if="isadmin">管理者</span>
            <span v-else>一般會員</span>
        </div>
        <router-link to="/admin/orders">
            <button v-if="isadmin" class="btn btn-info">芒果帳單</button>
        </router-link>
        <router-link to="/admin/accounts">
            <button v-if="isadmin" class="btn btn-warning ms-2">帳號管理</button>
        </router-link>
        <button class="btn btn-danger ms-2" @click="Logout">登出</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/api/axios';

const username = ref('');
const isadmin = ref(false);

const router = useRouter();

onMounted (async () =>{
    try {
        const res = await axios.get('admin/member')
        username.value = res.data.username;
        isadmin.value = res.data.admin
        // console.log(res);
        // console.log(res.data.username) // 例如 "alice"
    } catch (err) {
        console.error('取得使用者失敗', err)
        if ((err as any).status === 403) {
            Logout();
        }
    }
})

const Logout = () => {
    localStorage.removeItem('token')
    router.push('admin/login')
}
</script>