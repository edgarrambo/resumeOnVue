<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useForm, useField } from 'vee-validate';
import * as yup from "yup";

const schema = yup.object({
   username: yup.string().required().email().label("Email"),
   password: yup.string().required().min(8).label("Password"),
});

useForm({
   validationSchema: schema,
});


const { value: username, errorMessage: emailError } = useField("username");
const { value: password, errorMessage: passwordError } = useField("password");


import useAuth from '../composables/useAuth';
import useError from "../composables/useError";

const { isAuthenticated, login, signup, googleLogin } = useAuth();

const router = useRouter();

const logginIn = async() => {
    await login(username.value, password.value);
    goToHome();
};


const signingUp = async() => {
    await signup(username.value, password.value);
    router.push("/")


};

const google = async() => {
    await googleLogin();
    goToHome();
};


const goToHome = () => {
    if (isAuthenticated.value) {
        router.push("/")
    } else {
    setError("Invalid Email or Password");
    start();
    }
};


const { error, setError} = useError();


 </script>

 <template>

<div class="flex items-center justify-center px-3 pb-8 mx-3 mt-8 mb-8 text-2xl bg-white border-2 border-yellow-500 rounded-lg flexmt-20">

   <form  @submit.prevent="logginIn" class="flex flex-col p-4 space-y-4 text-xl" >
      <input name="username"
      type="text" class="py-4 text-xl border-4 rounded-lg " 
      placeholder="Username" v-model="username"/>
      <span class="text-xl text-center text-red-800 ">{{ emailError }}</span>
       <input name="password" 
       type="password" class="py-4 text-xl border-4 rounded-lg" 
       placeholder="Password" v-model="password"/>
        <span class="px-4 text-xl text-center text-red-800 ">{{ passwordError }}</span>

       <div class="flex space-x-2">
        <button
       @click="signingUp" 
       class="w-1/2 py-2 text-white bg-blue-700 rounded-lg hover:cursor-pointer hover:bg-yellow-500 hover:text-white" >
       Sign Up
       </button>
    <button 
    type="submit" 
    @submit.prevent="logginIn" 
       class="w-1/2 py-2 text-yellow-500 bg-black rounded-lg hover:bg-yellow-500 hover:text-white" >
       Login
       </button>
       </div>
    <button @click="google"
    class="flex justify-center bg-white rounded-lg hover:bg-grey-300">
    <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
               alt="">
      </button>
    </form>
</div>
<div v-if="error"
 class="py-4 font-extrabold text-center bg-red-600 rounded-lg" >{{ error }}</div>
 
</template>
 