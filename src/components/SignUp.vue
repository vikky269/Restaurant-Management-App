<template>
   <img src="../assets/resta.png" alt="logo" width="150px" height="150px">
  <h1>Sign up</h1>

  <form class="register" @submit.prevent="signup">
   <input type="text" placeholder="Enter name" v-model="signupData.name" required>
   <input type="email" placeholder="Enter Email"  v-model="signupData.email" required>
   <input type="password" placeholder="Enter password" v-model="signupData.password" required>
    <button type="submit" :disabled="isloading" >
       <template v-if="isloading">
        <VueSpinner size="20" color="green" />
        </template>
        <template v-else>
          Sign up
        </template>
    </button>
  </form>
    
  <p>Already registered? <router-link to="/login">Login</router-link></p>
 
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import {VueSpinner} from 'vue3-spinners'


const isloading = ref(false)

const router = useRouter()

   const signupData = ref({
        name: "",
        password: "",
        email: ""
   })


    const signup = async ()=> {

      isloading.value = true

    try {
      let result =  await axios.post("http://localhost:3000/users", signupData.value)
      //console.log(result.data)
      if(result.status == 201){
        toast.success("sign up successful",{
         timeout: 1000,
        })
        localStorage.setItem("user Info", JSON.stringify(result.data))
        setTimeout(()=> {
          router.push('/login')
        }, 1000)
      }
    
    } catch (error) {
      console.error("Error during signup:", error);
        toast.error("Sign up failed");
    }
    finally {
        isloading.value = false
      }
    
      return {isloading}

  }
   onMounted(()=> {
    let user = localStorage.getItem("user Info")
    if(user){
      router.push('/')
    }
   })
   
</script>

<style scoped>
h1{
    color:skyblue;
    text-align: center;
}
img{
  margin: auto;
  text-align: center;
}
.register{
  align-items: center;
}
.register input{
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
.register button{
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