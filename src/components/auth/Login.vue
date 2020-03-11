<template>
<div class="row">
  <div class="col-xs-6 col-xs-offset-4 col-sm-6 col-sm-offset-4">
    <div class="card">
      <div class="card-header font-weight-bold">Sign in with your Account</div>
      <div class="card-body card-block">
        <form @submit.prevent="login">
          <div class="row form-group">
            <div class="col-6 offset-2">
              <div class="form-group">
                <input type="email" id="city" class="form-control" placeholder="Enter email" v-model="email">
              </div>
              <div class="form-group">
                <input type="password" id="postal-code" class="form-control" placeholder="Enter password" v-model="password">
              </div>
              <div class="form-group text-center">
                <button type="submit" class="btn btn-success btn-rounded ">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
  import axios from 'axios'

  axios.defaults.withCredentials = true
  axios.defaults.baseURL = 'http://quotation-dev/'
  axios.crossDomain = true;

  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        loggedIn: false
      };
    },
    methods: {
      login() {
        axios.get("airlock/csrf-cookie").then(response => {
          axios.post("/api/login", {
            email: this.email,
            password: this.password
          }).then(response2 => {           
            localStorage.setItem('loggedIn', 'true');
            this.loggedIn = true;
            this.$router.push({name: 'home'});
          })
          .catch(error => {
            console.log(error)
          });
        });
      }
    }
  };
</script>