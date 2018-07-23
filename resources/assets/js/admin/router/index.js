import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '../containers/Full'

// Views
import Dashboard from '../views/Dashboard'
import User from '../views/user/index'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          name: 'User',
          path: '/user',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'User list',
              component: User
            },
            {
              path: 'add',
              name: 'Add User',
              component: User
            },
            {
              path: 'edit/:id',
              name: 'Update User',
              component: User
            }
          ]
        },

      ]
    }
  ]
})
