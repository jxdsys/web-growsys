import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import Homes from '@/components/Homes'
import SchAppra from '@/components/SchAppra'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/Homes',
      name:'Homes',
      component:Homes,
      redirect:"/SchAppra",
      children:[
        {path:'/SchAppra',component:SchAppra},


      ]
    },

  ]
})
