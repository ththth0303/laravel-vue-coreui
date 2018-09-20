<template>
  <router-view></router-view>
</template>

<script>
import { callApiCheckToken, callApiRefreshToken } from "./api/auth";

export default {
  name: 'app',
  async mounted() {
    let auth = await callApiCheckToken();
    console.log(auth);
    
    if (auth.status !== 200) {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
    axios.interceptors.response.use(null, function (error) {
    if (error.status === 401) {
        this.$router.push('/login');
        console.log('vào');
        
    }
    return Promise.reject(error);
}); 
    
  }
}
</script>

<style lang="scss">
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
</style>
<style>
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
</style>
<style lang="scss">
  // Import Main styles for this application
  @import './assets/scss/style';
</style>
