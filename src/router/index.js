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
import DeptAppraSetScore from '@/components/DeptAppraSetScore'
import Tomark from '@/components/Tomark'
import Distridept from '@/components/Distridept'
import myinfo from '@/components/myinfo'
import myscore from '@/components/myscore'
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
        {path:'/studentInfo',component:studentInfo},
        {path:'/uppwd',component:uppwd},
        {path:'/welcome',component:welcome},
        {path:'/dept',component:Dept},
        {path:'/deptinfo',component:DeptAppra},
        {path:'/empinfo',component:EmpMain},
        {path:'/SchAppra',component:SchAppra},
        {path:'/Repwd',component:Repwd},
        {path:'/AdminTerm',component:AdminTerm},
        {path:'/SchAllStu',component:SchAllStu},
        {path:'/myscore',component:myscore},
        {path:'/markemp',component:DeptAppraSetScore},
        {path:'/Tomark',component:Tomark},
        {path:'/myinfo',component:myinfo},
        {path:'/Distridept',component:Distridept},
      ]
    },
  ]
})
