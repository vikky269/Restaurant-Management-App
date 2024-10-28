<template>
    <div>
        <img src="../assets/resta.png" alt="logo" width="150px" height="150px">
        <h1>Login</h1>

        <form class="login" @submit.prevent="Login">
            <input type="email" placeholder="Enter Email" v-model="loginData.email"  required>
            <input type="password" placeholder="Enter password"  v-model="loginData.password" required>
            <button type="submit" :disabled="isloading">
                <template v-if="isloading">
                    <VueSpinner size="20" color="green" />
                </template>
                <template v-else>
                    Login
                </template>
            </button>
        </form>

        <p>Not yet registered? <router-link to="/sign-up">Sign up</router-link></p>

    </div>
</template>

<script setup>
import {VueSpinner} from 'vue3-spinners'
import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const isloading = ref(false)

const router = useRouter()

const loginData = ref({
        password: "",
        email: ""
   })

const Login = async ()=> {
 isloading.value = true
    try {
        let result = await axios.get(`http://localhost:3000/users?email=${loginData.value.email}&password=${loginData.value.password}`)
        console.log(result.data)
        const user = result.data.find((user) => user.email === loginData.value.email)
        if(user && user.password === loginData.value.password){
        toast.success("Login successful",{
         timeout: 1000,
        })
        localStorage.setItem("user Info", JSON.stringify(result.data[0]))+
        setTimeout(()=> {
          router.push('/')
        }, 1000)
      }
      else{
        toast.error('Invalid email or password.')
      }

    }
     catch (error) {
        toast.error('No user with these credentials found. Please Sign up')
    }
    finally{
        isloading.value = false
    }

}
</script>

<style scoped>
h1{
    color:skyblue;
}
.login input{
     width: 300px;
     height: 40px;
     padding-left: 20px;
     display: block;
     margin-bottom: 30px;
     margin-left: auto;
     margin-right: auto;
     border: 1px solid skyblue;
     border-radius: 4px;
     outline: none;
}
.login button{
    width: 320px;
    border: 1px solid skyblue;
    height: 40px;
    color: white;
    background-color: skyblue;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
}
</style>