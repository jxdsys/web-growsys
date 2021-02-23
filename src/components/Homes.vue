<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <div style="float: left">
          <span>金桥学员成长跟踪系统({{loginName}})</span>
        </div>
        <div style="float: right">
          <span>用户名：{{userName}}</span>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
<!--          &lt;!&ndash;导航显示&ndash;&gt;background-color="#E8ECD5"-->
          <el-menu  class="el-aside" text-color="#fff" active-text-color="black"
                   unique-opened :router="true" :collapse="isCollapse" :collapse-transition="false"
          :default-active="activePath" >
              <el-menu-item :index="menu.path" v-for="menu in menuList" :key="menu.id"
                           @click="saveNavState(menu.path)">
                <template slot="title">
                  <span>{{menu.title}}</span>
                </template>
              </el-menu-item >
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 显示内容页面-->
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: "Homes",
    data() {
      return {
        menuList: [],
        userName:sessionStorage.getItem("userName"),
        isCollapse:false,
        activePath:"/welcome",
        role:sessionStorage.getItem("role"),
          loginName:""
      }
    },
    methods: {
      getMenuList: function () {
          // alert(this.role)
        axios.post("/getMenu",this.role).then(res => {
          if (res.status == "200") {
            this.menuList = res.data.data;
          } else {
            this.$message.error("数据获失败");
          }
        })
      },
        isLogin: function () {
            if (sessionStorage.getItem("userName") == null) {
                this.$router.replace({path: '/'})
            }
        },
      saveNavState:function (activePath) {
           // this.activePath = activePath;
           if(activePath =="/exit"){
               this.$confirm('是否退出系统?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
               }).then(() => {//确定\
                   //this.activePath=""
                 sessionStorage.clear()
                   this.$router.push({
                       path: '/'
                   });
               }).catch(() => {
                   this.$router.go(-1);
                   this.$message({
                       type: 'info',
                       message: '已取消退出'
                   });
               })
           }else{
               this.activePath = activePath;
           }
           sessionStorage.setItem('activePath',this.activePath)
        },
      getUsername:function() {
          if (this.role == 0) {
              this.loginName = "管理员"
          } else if (this.role == 1) {
              this.loginName = "学生"
          } else if (this.role == 2) {
              this.loginName = "老师"
          } else if (this.role == 3) {
              this.loginName = "部门评价人"
          }
      }
    },
    created() {
      this.isLogin()
      this.getMenuList();
      this.getUsername()
      this.activePath = sessionStorage.getItem("activePath")
    }
  }
</script>
<style scoped>
  .home-container {
    height: 630px;
  }
  .el-header {
    /*background-color: #3E89EE;*/
    background-image: linear-gradient(to bottom, #547BD8 , #BDC8FF);
    /*background-color: #373d41;*/
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  .el-aside {
    background-image: linear-gradient(to bottom, #547BD8 , #BDC8FF);
  }

  .el-aside el-menu {
    border-right: none;
  }

  .el-main {
    background-color: #eaedf1;

  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  .el-header div span {
    margin-left: 15px;
  }

  .logo_img {
    width: 55px;
    height: 55px;
  }

  .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

</style>
