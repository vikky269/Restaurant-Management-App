<template>
    <div>
     <Header />

    <h1 v-if="reuser">Hello {{ reuser.name }}, update your favorite restaurant</h1>
    <h1 v-else>Loading...</h1>
  </div>

  <form class="update" @submit.prevent>
    <input type="text" name="name" placeholder="Enter Name" required v-model="updateData.name">
    <input type="text" name="address" placeholder="Enter address" required v-model="updateData.address">
    <input type="text" name="contact" placeholder="Enter contact" required v-model="updateData.contact">
     <button type="button" @click="updaterestaur"> Update restaurant</button>
   </form>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import Header from './Header.vue';
import axios from "axios";
import { toast } from 'vue3-toastify';

components:{Header}

const updateData = ref({
        name: "",
        address: "",
        contact: ""
})

const router = useRouter()
const route = useRoute()
//console.log(route.params.id)

const reuser = ref(null)

 onMounted(async ()=> {
    let user = localStorage.getItem("user Info")
    if(user){
       reuser.value = JSON.parse(user)
    }
    else{
    router.push('/sign-up')
    }

  const result = await axios.get(`http://localhost:3000/restaurant/${route.params.id}`)
  updateData.value = result.data
})

const updaterestaur = async()=> {
  // console.log(restData.value)
   try {
      let result =  await axios.put(`http://localhost:3000/restaurant/${route.params.id}`, updateData.value)
      console.log(result)
      if(result.status == 200){
        toast.success("Restaurant sucessfully updated",{
         timeout: 1000,
        })
        setTimeout(()=> {
          router.push('/')
        }, 1000)
      }
   } catch (error) {
      toast.error("Failed to update restaurant")
   }
}

</script>

<style>
h1{
    color: brown;
    text-align: center;
}
.update input{
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
.update button{
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