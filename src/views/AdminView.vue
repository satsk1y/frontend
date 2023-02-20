<template>
    <div>
        <h1>Admin Page</h1>
        <button @click.prevent="gett" class="btn">show users</button>


    </div>
    <div class="users">

            <table v-for="user in users">
                <td>
                    {{  user.username }}
                </td>
                <td>
                    {{ user.role }}
                </td>
                <td v-if = "user.role === 'user'">
                    <button @click.prevent="make">Make access</button>
                </td>
                <td v-if = "user.role ==='superuser' || user.role === 'admin'" >
                    All permission accessed
                </td>
                
                
                
            </table>
        </div>
</template>


<script>
import axios from 'axios';
    export default{
        data() {
            return {
                users: []
        }
        },
        methods: {
    async gett() {
        
          const response = await axios.get('http://localhost:3000/admin-panel');
          console.log(response.data.length)
          for(let i = 0; i < response.data.length; i++){
            console.log(response.data[i])
            this.users.push({username : response.data[i]._fields[0], role: response.data[i]._fields[1]})
          }
          
          console.log(this.users)
        

        

        //   this.$router.push('/dashboard');
         
      },
      async make(){
        const response = await axios.get('http://localhost:3000/make-access');
      }
        }
    }
</script>


<style>
    .btn{
        padding: 15px;
    }
    table{
        border: 2px solid #000;
        table-layout: fixed;
    width: 60%;
    }
    td{
        padding:10px;
        border: 2px solid #000;
    }
</style>