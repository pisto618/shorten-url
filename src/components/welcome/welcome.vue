<template>
  <div id="welcome">
    <div class="shortener-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="url">URL</label>
          <input
                  type="text"
                  id="actualURL"
                  v-model="actualURL">
        </div>
        <div class="submit">
          <button class="btn btn-primary" type="submit">Shorten</button>
        </div>
      </form>
    </div>
    <br><br>
    <transition name="fade" mode="out-in"> 
      <div v-if="shortenURL" class="alert-success shortener-form text-center"> 
        <a target="_blank" :href="shortenURL"> {{ shortenURL }} </a><br/><br/>   
        <button class="btn btn-success" @click="copyToClipBoard()">Copy URL</button>
      </div>
      <div v-else-if="errorCause" class="alert-danger shortener-form text-center" > Not URL </div>
    </transition>
    
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data () {
      return {
        actualURL: '',
        shortenURL: '',
        selectedComponent: 'app-panel',
        errorCause: ''  
      }
    },
    methods: {
      onSubmit () {
        this.shortenURL = '';
        const formData = {
          actualURL: this.actualURL
        }
        axios.post('/saveLink',formData)
          .then( result => { 
            this.errorCause = '';
            this.shortenURL = result.data; 
          })
          .catch( error => { 
            this.errorCause = 'Not URL';
            this.shortenURL = '';
          } 
        );
      },
      copyToClipBoard() {
        var dummyTextField = document.createElement("input");
        document.body.appendChild(dummyTextField);
        let shortenURL = this.shortenURL;
        dummyTextField.setAttribute('value', shortenURL);
        dummyTextField.select();
        document.execCommand("copy");
        document.body.removeChild(dummyTextField);        
      }
    }
  }
</script>


<style scoped>
  #welcome {
    width: 90%;
    margin: auto;
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


  .shortener-form {
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

  .submit {
    text-align: center;
  }


</style>