<template>
  <div class="just">
    <div class="title">Sign In</div>
    <form class="wrapper">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required  />
      <button @click.prevent="login">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data)
        localStorage.setItem('token', response.data.token);
        this.$router.push({ name: 'log' });
        
        // if (response.data.auth.username === 'admin' && response.data.auth.password === 'admin') {
        //   this.$router.push({ name: 'admin-panel' });
        // } else if (response.data.role === 'superuser') {
        //   this.$router.push({ name: 'main' });
        // } else {
          
        // }
      } catch (error) {
        console.error(error);
      }
    },
  },
};


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.wrapper{
  background: aqua;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 20px;
}
body{
  font-family: 'Roboto', sans-serif;
}
input {
  display: block;
  margin-top: 5px;
  padding: 5px;
  border-radius: 10px;
}
label, button{
  margin-top: 15px;
}
button{
  border-radius: 15px;
  background-color: yellow;
}
.just{
  height: 100vh;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
