<template>
    <div class="container my-5">
        <h2 class="mb-4">會員登入</h2>
        <form @submit.prevent="Login">
            <div class="mb-3">
                <label class="form-label">使用者名稱</label>
                <input type="text" class="form-control" v-model="username" required />
            </div>
            <div class="mb-3">
                <label class="form-label">密碼</label>
                <input type="password" class="form-control" v-model="password" required />
            </div>
            <button type="submit" class="btn btn-primary">登入</button>
            <router-link  class="btn btn-success ms-2" :to="'/Register'">Register</router-link>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '@/api/axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');

const router = useRouter();

const Login = async () => {
    try{
        await axios.post('/login', {
            username : username.value,
            password : password.value,
        })
        .then(res => {
            const token = res.data.token

            localStorage.setItem('token',token)
            alert('登入成功')
            router.push('/')
        })
    }
    catch(err){
        alert("登入錯誤");
    }
}


</script>