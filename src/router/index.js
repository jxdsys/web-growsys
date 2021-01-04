import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

import Homes from '@/components/Homes'
import welcome from '@/components/welcome'
import DeptAppra from '@/components/DeptAppra'
import Dept from '@/components/Dept'
import EmpMain from '@/components/EmpMain'

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
        {path:'/welcome',component:welcome},
        {path:'/deptinfo',component: DeptAppra}
        ,{path:'/dept',component: Dept},
        {path:'/empinfo',component: EmpMain},
      ]
    },
  ]
})
