<!-- 之後改道Login -->

<template>
    <div class="container my-5">
        <h2 class="mb-4">加入會員</h2>
        <form @submit.prevent="register">
            <div class="mb-3">
                <label class="form-label">使用者名稱(勿輸入個資當作帳號)</label>
                <input type="text" class="form-control" v-model="username" required />
            </div>
            <div class="mb-3">
                <label class="form-label">密碼</label>
                <input type="password" class="form-control" v-model="password" required />
            </div>
            <!-- <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" v-model="admin" id="isAdmin" />
                <label class="form-check-label" for="isAdmin">管理員</label>
            </div> -->
            <div>
                <button type="submit" class="btn btn-primary">註冊</button>
                <router-link class="btn btn-warning ms-2" to="/login">返回</router-link>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/api/axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const admin = ref(false)

const router = useRouter()

const register = async () => {
    try {
        const res = await axios.post('/register', {
            username: username.value,
            password: password.value,
            admin: false, //先取消
        })
        alert(res.data.message)
        router.push('/login')
        
    } catch (error) {
        alert('註冊失敗！')
    }
}
</script>
