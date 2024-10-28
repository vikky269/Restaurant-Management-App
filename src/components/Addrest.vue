<template>
   <div>
      <Header />

      <h1 v-if="reuser">Hello {{ reuser.name }}, Add your favourite restaurant</h1>
      <h1 v-else>Loading...</h1>
   </div>

   <form class="add" @submit.prevent>
    <input type="text" name="name" placeholder="Enter Name" required v-model="restData.name">
    <input type="text" name="address" placeholder="Enter address" required v-model="restData.address">
    <input type="text" name="contact" placeholder="Enter contact" required v-model="restData.contact">
     <button type="button" @click="addrestaur">Add new restaurant</button>
   </form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import Header from './Header.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

components: { Header }

const router = useRouter()

const reuser = ref(null)

const restData = ref({
        name: "",
        address: "",
        contact: ""
})

onMounted(() => {
   let user = localStorage.getItem("user Info")
   if (user) {
      reuser.value = JSON.parse(user)
   }
   else {
      router.push('/sign-up')
   }
})

const addrestaur = async()=> {
  // console.log(restData.value)
   try {
      let result =  await axios.post("http://localhost:3000/restaurant", restData.value)
      console.log(result)
      if(result.status == 201){
        toast.success("Restaurant sucessfully added",{
         timeout: 1000,
        })
        setTimeout(()=> {
          router.push('/')
        }, 1000)
      }
   } catch (error) {
      toast.error("Failed to add restaurant")
   }
}

</script>

<style>
h1 {
   color: brown;
   text-align: center;
}
.add input{
     width: 300px;
     height: 40px;
     padding-left: 20px;
     display: block;
     margin-bottom: 30px;
     margin-left: auto;
     margin-right: auto;
     border: 1px solid brown;
     border-radius: 4px;
     outline: none;
}
.add button{
   width: 320px;
    border: 1px solid brown;
    height: 40px;
    color: white;
    background-color: brown;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
}
</style>