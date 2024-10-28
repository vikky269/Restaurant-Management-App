<template>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/add">Add restaurant</router-link>
      <!-- <router-link to="/update">Update restaurant</router-link> -->
      <a @click="LogOut">LogOut</a>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

 const router = useRouter()



const LogOut = ()=> {
    localStorage.clear()
    router.push('/login')
}
</script>

<style scoped>
.nav{
    background-color: brown;
    overflow: hidden;
}
.nav a{
    float: left;
    margin-right: 10px;
    text-decoration: none;
    color:#fff;
    font-size: 18px;
    padding: 18px 20px;
    text-align: center;
    cursor: pointer;
}
.nav a:hover{
    background-color: rgb(95, 4, 4);
    border-radius: 10px;
    
}
</style>