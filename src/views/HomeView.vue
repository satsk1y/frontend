<template>
  <div class="home">
    <div class="container">
      <div class="title">
    Explore more <br> Movie Graph Database
  </div>
  <div class="subtitle">
    Network Database with functionality
  </div>
  <button class="main-btn" @click="go">
    Get Started Now
  </button>
    </div>
    
  <img src="https://img.freepik.com/premium-vector/set-movie-icon-illustration-collections-movie-icons-concept-isolated_138676-799.jpg" alt="" class="img">
    
  </div>


  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods: {
    go(){
      this.$router.push('/register')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap');
  *,body{
    margin:0;
    padding:0;
    font-family: 'Rubik', sans-serif;
  }
  .title{
    font-size: 60px;
    color:#0f3c4c;
    font-weight: 500;
    padding-top: 200px;
  }
  .home{
    
    background-size: cover;
    height:100vh;
  }
  .img{
    position: absolute;
    top:30px;
    right:0
  }
  .img img{

    height:90vh;
  }
  .container{
    padding-left: 30px;
  }
  .subtitle{
    padding-top: 10px;
    font-size: 20px;
    color:#0b2d39;
  }
  .main-btn{
    margin-top: 20px;
    padding:10px;
    font-size: 20px;
    border-radius: 10px;
    background-color: blanchedalmond;
  }

  
</style>
