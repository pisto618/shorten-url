<template>
  <div id="dashboard">
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Key</th>
        <th scope="col">URL</th>
        <th scope="col">Accessed Amout</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="userURL in userURLs">
          <td>
            {{ userURL.id }}
          </td>
          <td>
            {{ userURL.key }}
          </td>
          <td>
            {{ userURL.actualURL }}
          </td>
          <td>
            {{ userURL.urlAccessCounter }}
          </td>
      </tr>
    </tbody>
  </table>    
  </div>
</template>

<script>

  import axios from 'axios'
  export default {

    data() {
      return {
        email: '',
        userURLs : []
      }
    },
    created() {
      let jwtToken = this.$cookies.get('jwtToken');
      if(jwtToken === null){
        this.$router.push('/signin');
      }
      axios.get('/dashboard', {
            headers: {
              jwtToken: this.$cookies.get('jwtToken') 
            }
          })
        .then( res => {
            this.userURLs = res.data;          
        })
        .catch( error => console.log(error))
    }

  }
</script>

<style scoped>
  #dashboard {
    margin: auto 10%;
  }
</style>