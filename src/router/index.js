import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import Homes from '@/components/Homes'
import welcome from '@/components/welcome'
import studentInfo from '@/components//studentInfo'
import uppwd from '@/components/uppwd'


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
      redirect:"/studentInfo",
      children:[
        {path:'/studentInfo',component:studentInfo},
        {path:'/uppwd',component:uppwd}
      ]
    },


  ]
})
