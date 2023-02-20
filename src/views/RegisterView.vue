<template>
  <div class="just">
    
    <div class="wrapper">
      <div class="title">
      Register Account Form
    </div>
        <input type="text" id="username" placeholder="username" v-model="username"  required/>
  
        <input type="email" id="email" placeholder="email" v-model="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />

        <input type="password" id="password" placeholder="password" v-model="password" required />
  
        <button @click.prevent="submit">Register</button>
    </div>
  </div>
    
      
    
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async submit() {
        try {
          const response = await axios.post('http://localhost:3000/api/register', {
            
            username: this.username,
            email: this.email,
            password: this.password,
              
            
          });
          console.log(response.data)
          this.$router.push({ name: 'login' })
          console.log(response.data);
          if(response.status==201){

          }
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
  background:yellow;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding:5px 20px 20px 20px;
  border-radius: 10px;
  margin-top: 20px;
}
.title{
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;

}
body{
  font-family: 'Roboto', sans-serif;
}
input {
  display: block;
  margin-top:25px;
  padding:15px;
  border-radius: 10px;

}
label{
  margin-top:5px;
}
button{
    border-radius: 15px;
    background-color: aqua;
    padding: 10px 0;
    margin-top:15px;
  }
.just{
  height:100vh;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>