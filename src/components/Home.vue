<template>
   <div>
      <Header />

      <h1 v-if="reuser">Hello {{ reuser.name }}, check out your favourite restaurants</h1>
      <h1 v-else>Loading...</h1>

      <div v-if="restaurants.length>0">
         <table border="1">
         <tr class="table-header">
            <td>ID</td>
            <td>Name</td>
            <td>Address</td>
            <td>Contact</td>
            <td>Actions</td>
         </tr>
         <tr v-for="item in restaurants" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.contact }}</td>
            <td>
               <router-link class="update" :to="`/update/${item.id}`">Update</router-link>
               <button class="delete-btn" @click="deleterestaurant(item.id)">Delete</button>
            </td>
         </tr>
      </table>
      </div>
      <div v-else>
         <h3>Oops!! You have no favourite restaurants</h3>
         <router-link to="/add" class="add-resto">Get started</router-link>
      </div>
   </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import Header from './Header.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

components: { Header }

const router = useRouter()
const restaurants = ref([])
const reuser = ref(null)


const deleterestaurant = async (id) => {
   try {

      let result = await axios.delete(`http://localhost:3000/restaurant/${id}`)
      console.log(result)
      if(result.status === 200){
       loadData()
       toast.success("Restaurant successfully deleted")
      }
   } catch (error) {
    
   }
}

const loadData = async () => {
   let user = localStorage.getItem("user Info")
   if (user) {
      reuser.value = JSON.parse(user)
   }
   else {
      router.push('/sign-up')
   }

   let result = await axios.get("http://localhost:3000/restaurant")
   //console.log(result)
   restaurants.value = result.data

}


onMounted(async () => {
   loadData()
})

</script>

<style scoped>
h1 {
   color: brown;
   text-align: center;
}

td {
   width: 190px;
   height: 60px;
}

table {
   margin: 0px auto;
   border: 1px solid brown;
}

.update {
   color: brown;
   text-decoration: none;
}

.table-header {
   text-transform: uppercase;
   font-weight: bold;
   font-size: 20px;
}

.delete-btn {
   margin-left: 10px;
   background-color: brown;
   color: white;
   padding: 4px 10px;
   outline: none;
   border: none;
   border-radius: 3px;
   cursor: pointer;
}

.delete-btn:hover {
   transform: translateY(-1px);
}
h3{
   color: brown;
}
.add-resto{
   text-decoration: none;
   background-color: brown;
   color: white;
   padding: 10px 18px;
   border-radius: 10px;
}
</style>