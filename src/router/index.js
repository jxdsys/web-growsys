import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import Homes from '@/components/Homes'
import welcome from '@/components/welcome'
import Dept from '@/components/Dept'
import DeptAppra from '@/components/DeptAppra'
import EmpMain from '@/components/EmpMain'
import SchAppra from '@/components/SchAppra'
import Repwd from '@/components/Repwd'
import AdminTerm from '@/components/AdminTerm'
import SchAllStu from '@/components/SchAllStu'
import uppwd from '@/components/uppwd'
import studentInfo from '@/components/studentInfo'
Vue.use(Router);

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
        {path:'/welcome',component:welcome},
        {path:'/dept',component:Dept},
        {path:'/deptinfo',component:DeptAppra},
        {path:'/empinfo',component:EmpMain},
        {path:'/SchAppra',component:SchAppra},
        {path:'/Repwd',component:Repwd},
        {path:'/AdminTerm',component:AdminTerm},
        {path:'/SchAllStu',component:SchAllStu},
        {path:'/uppwd',component:uppwd},
        {path:'/studentInfo',component:studentInfo},
      ]
    },

  ]
})
