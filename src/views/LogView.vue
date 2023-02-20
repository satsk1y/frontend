<template>
    <div class="profile">
      <p v-if="isLoggedIn" class="profile__username">Welcome, {{ user.username }}!</p>
      <div v-if="isLoggedIn" class="profile__buttons">
        <button class="button button--logout" @click="logout">Logout</button>
        <button class="button button--redirect" @click="redirect">Go</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .profile__username {
    font-size: 30px;
    margin-bottom: 2rem;
  }
  
  .profile__buttons {
    display: flex;
    gap: 1rem;
  }
  
  .button {
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .button--logout {
    background-color: #f44336;
    color: #fff;
  }
  
  .button--redirect {
    background-color: #4caf50;
    color: #fff;
  }
  </style>
  
  <script>
  export default {
    name: 'log',
    data() {
      return {
        user: {}
      }
    },
    created() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        this.user = user
      } else {
        this.$router.push('/')
      }
    },
    computed: {
      isLoggedIn() {
        return Object.keys(this.user).length !== 0
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.$router.push('/')
      },
      redirect(){
        this.$router.push('/main')
      }
    },
    destroyed() {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
  </script>
  