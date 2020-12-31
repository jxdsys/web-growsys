<template>
   <div  class="back"  >
      <div   style="height: 500px ;width: 65%;float: left;margin-top: 50px">
        </div>
         <div style="height: 500px;width: 35%;float: right;margin-top: 50px">
          <div class="loginContainer">
            <div style="line-height: 40px">
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
   </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: "login",
    data(){
      return{
        //表单数据
        form:{
          name:"",
          password:""
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 6, message: '长度在 3 到 6个字符', trigger: 'blur'}
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur'},
            // {min: 6, max: 15, message: '长度在 6到 15 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      login:function () {
        //判断表单验证是否通过然后提交数据到后台
        this.$refs["loginform"].validate((valid) => {
          if (valid) {
            //提交我们的用户名和密码
           axios.post("/login",this.form).then(res => {
             if (res.status == "200"){
                 //将用户名存储到sessionStorage中
                 //sessionStorage.setItem("uname",this.from.name)
                 sessionStorage.setItem("role",res.data.role)
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
    background:url(../assets/3.1.jpg  );
   height: 705px;
  }
  .loginContainer{
    width: 350px;
    height: 260px;
    position:relative;
    left: 3%;
    top: 140px;
    background-color: aliceblue;
    padding: 10px 30px 20px 10px
  }
</style>
