import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import Homes from '@/components/Homes'
import SchAppra from '@/components/SchAppra'
import welcome from '@/components/welcome'
import Repwd from '@/components/Repwd'
import AdminTerm from '@/components/AdminTerm'
import SchAllStu from '@/components/SchAllStu'


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
      redirect:"/welcome",
      children:[
        {path:'/SchAppra',component:SchAppra},
        {path:'/Repwd',component:Repwd},
        {path:'/AdminTerm',component:AdminTerm},
        {path:'/welcome',component:welcome},
        {path:'/SchAllStu',component:SchAllStu},
      ]
    },


  ]
})
