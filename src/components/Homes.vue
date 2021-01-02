<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <div>
          <span>金桥学员成长跟踪系统</span>
        </div>
        <el-button type="info">安全退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <!--导航显示-->
          <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff"
                   unique-opened :router="true" :collapse="isCollapse" :collapse-transition="false"
          :default-active="activePath">
              <el-menu-item  :index="menu.path" v-for="menu in menuList" :key="menu.id" @click="saveNavState(menu.path)">
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
        isCollapse:false,
        activePath:"/SchAppra",
        role:sessionStorage.getItem("role")

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
      saveNavState:function (activePath) {
        this.activePath = activePath;
        sessionStorage.setItem('activePath',this.activePath)
      }

    },
    created() {
      this.getMenuList();
      this.activePath = sessionStorage.getItem("activePath")
    }

  }
</script>

<style scoped>
  .home-container {
    height: 630px;
  }

  .el-header {
    background-color: #373d41;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  .el-aside {
    background-color: #333744;
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
