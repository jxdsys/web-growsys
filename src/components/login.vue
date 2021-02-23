<template>
   <div  class="back"  >
     <div style="line-height: 40px">
       <div class="loginContainer" style="margin-left: 500px">
         <p style="font-size: 20px;line-height: 1.7">欢迎登录金桥学院成长跟踪系统</p>
         <el-form ref="loginform" :model="form" :rules="rules" label-width="80px" >
           <el-form-item label="用户名" prop="name">
             <el-input v-model="form.name" style=""></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="password">
             <el-input type="password" v-model="form.password"></el-input>
           </el-form-item>
           <el-button type="primary" @click="login" style="width: 140px ">登录</el-button>
         </el-form>
       </div>

     </div>
   </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: "login",
    data(){
      return{
          userName:"",
        //表单数据
        form:{
          name:"",
          password:""
        },
        rules: {

          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods:{

        login:function () {
          this.$refs["loginform"].validate((valid) => {
           if (valid) {
            //提交我们的用户名和密码
           axios.post("/login",this.form).then(res => {
             if (res.data.status=="200"){
                 //将用户名存储到sessionStorage中
                 sessionStorage.setItem("userName",this.form.name)
                 sessionStorage.setItem("role",res.data.data.role)
                 //跳转页面
                 this.$router.push({path:'/Homes'});
             } else {
               this.$message({
                 message:"用户名或者密码错误",
                 type: 'error'
               })
             }
           })
          }else {
            //用户名或者密码错误
            this.$message({
              message:"用户名或者密码错误",
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .back{
    background:url(../assets/ll.jpg );
    width: 100%;
   height: 705px;
  }
  .loginContainer{
    /*float: right;*/
    width: 350px;
    height: 260px;
    position:relative;
    left: 3%;
    top: 140px;
    background-color: #55949D;
    padding: 10px 30px 20px 10px
  }
</style>
