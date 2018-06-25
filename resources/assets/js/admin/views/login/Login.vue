<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <input type="text" class="form-control" placeholder="Username" v-model="credentials.email">
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input type="password" class="form-control" placeholder="Password" v-model="credentials.password">
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4" v-on:click="login()">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            credentials: {
                email: '',
                password: '',
                remember: false
            }
        }
    },
    beforeMount: function () {
        let auth = JSON.parse(localStorage.getItem('token'));
        if (auth && auth.token_type && auth.access_token) {
            this.$router.push({ name: 'Home'})
            // console.log(this);
            
        }
    },
    mounted: function() {
        console.log(this);
        this.$store.commit('increment')
        this.$store.commit('increment')
        console.log(this.$store.state.count);
        
        
    },
    methods: {
        login() {
            axios.post('http://localhost:8000/api/v0/login', this.credentials).then(response => {
                if (response.status === 200) {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    
                   this.$router.push({ name: 'Home'})
                }
            });
        },
    }

}
</script>
