<script setup>
import { useRouter } from 'vue-router';
import useAuth from '../composables/useAuth';
const { isAuthenticated, logout} = useAuth();
const router = useRouter();
const loggingOut = () => {
    logout();
    router.push("/login");
}
</script>


<template>
<div class="font-extrabold text-yellow-500 bg-black">
<div class="container flex items-center justify-between mx-auto">
    <!-- added router link to basicrouter icon -->
    <router-link to="/">
    <h1 class="text-3xl font-thin tracking-tighter"> 
        <img src="https://img.icons8.com/plasticine/30/000000/hamburger.png"/>
        Edgar's
        <span class="font-normal">Recipe App
        </span>
      
    </h1>
    </router-link>
    <nav>
    <ul class="flex space-x-4" >
        <!-- below are three different ways of routing, all are working -->
        <!-- notes for if need to reference later -->
        <router-link v-if="!isAuthenticated" :to="{name: 'Login'}">
        <li class="px-4 py-8 hover:cursor-pointer hover:bg-green-500 hover:text-green-800">Login </li>
        </router-link>
        <router-link 
        :to="{ path: '/', name: 'Index'}">
        <li class="px-4 py-8 hover:cursor-pointer hover:bg-green-500 hover:text-green-800">Homepage</li>
        </router-link>
        <router-link :to="{name: 'Salsas'}">
        <li class="px-4 py-8 hover:cursor-pointer hover:bg-green-500 hover:text-green-800">Salsas </li>
        </router-link>
        <router-link to="/sides">
        <li class="px-4 py-8 hover:cursor-pointer hover:bg-green-500 hover:text-green-800 ">Sides</li>
        </router-link>
        <router-link to="/abroad">
        <li class="px-4 py-8 hover:cursor-pointer hover:bg-green-500 hover:text-green-800">Abroad</li>
        </router-link>
        <div v-if="isAuthenticated" class="flex">
        <router-link  :to="{ path: '/traditional', name: 'Traditional'}">
        <li class="px-4 py-8 hover:cursor-pointer hover:bg-green-500 hover:text-green-800">Traditional</li>
        </router-link>   
        <button  @click="loggingOut">
         <li class="px-4 py-8 hover:cursor-pointer hover:bg-green-500 hover:text-green-800">Log Out</li>
        </button>
        </div>
        
       
    </ul>
    </nav>
    </div>
</div>

</template>
