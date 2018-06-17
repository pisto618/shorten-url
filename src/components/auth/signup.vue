<template>
  <div id="signup">
    <h1 class="text-center"> Sign Up </h1>
    <div class="signup-form">
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
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword">
        </div>
        <div class="submit">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
    <transition name="fade" mode="out-in"> 
      <div v-if="errorSignUp" class="alert-danger error-form text-center">  {{ errorSignUp }}   </div>
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
        confirmPassword: '',
        errorSignUp: ''
      }
    },
    methods: {
      onSubmit () {
        if(this.passwordMatch()) {
          const formData = {
            username: this.username,
            password: this.password,
          }
          axios.post('/users/signUp',formData)
          .then( result => {
                console.log(result);
                this.validateResponseAndGotoSignIn(result.data);
          } )
          .catch( error => {
            this.errorSignUp = error.response.data;
          });
        } else {
          this.errorSignUp = 'Password Not Match'
        }
      },
      passwordMatch() {
        let password = this.password;
        let confirmPassword = this.confirmPassword;
        let isPasswordMatch = password === confirmPassword;
        return isPasswordMatch;
      },
      validateResponseAndGotoSignIn(result) {
        if(result === 'Add user success'){
          this.$router.push('/signin');
        }
      }
    }
  }
</script>

<style scoped>
  
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
  
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
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

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

</style>