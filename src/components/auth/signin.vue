<template>
  <div id="signin">
    <h1 class="text-center"> Sign In </h1>
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="username">Username</label>
          <input
                  type="text"
                  id="username"
                  v-model="username">
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="submit">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
    <transition name="fade" mode="out-in"> 
      <div v-if="errorSignIn" class="alert-danger error-form text-center">  {{ errorSignIn }}   </div>
    </transition>    
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        username: '',
        password: '',
        errorSignIn: ''
      }
    },
    created() {
      let jwtToken = this.$cookies.get('jwtToken');
      if(jwtToken !== null) {
        this.$router.push('/');
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          username: this.username,
          password: this.password,
        }
        axios.post('/login',formData)
          .then( result => { 
            this.goToDashBoard(result);
          })
          .catch( error => { 
            this.errorSignIn = 'Bad Credential';
          } 
        );
      },
      goToDashBoard(result) {
        this.$cookies.set('jwtToken', result.data);
        this.$store.state.token = this.$cookies.get('jwtToken');
        this.$router.push('/dashboard');
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .fade-enter {
      opacity: 0;
  }

  .fade-enter-active {
      transition: opacity 1s;
  }

  .fade-leave {

  }

  .fade-leave-active {
      transition: opacity 1s;
      opacity: 0;
  }  

  .error-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

</style>