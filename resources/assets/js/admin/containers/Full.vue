<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
        <div class="splash-screen" v-show="mainLoading">
            <div class="splash-overlay" v-show="mainLoading"></div>
            <div class="splash-spinner"></div>
        </div>
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    },
    mainLoading() {
        return this.$store.state.storeLoading.contentLoading
    }
  }
}
</script>
