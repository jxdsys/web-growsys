<template>
  <div class="back" style="height: 630px" >
    <div style="text-align: center;width: 100%;height: 100%">
      <div class="loginContainer">
        <p style="font-size: 20px;line-height: 1.7">欢迎登录员工管理系统</p>
        <el-form ref="loginform" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>

          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="login">提交</el-button>
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
        //表单数据
        form:{
          name:"",
          password:""
        },
        rules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password:[
            {required: true, message: '请输入密码', trigger: 'blur'},
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
             if (res.data=="success"){
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
    background:url(../assets/grryg.jpg) repeat center center;
  }
  .loginContainer{
    width: 350px;
    position:relative;
    left: 35%;
    top: 160px;
    background-color: aliceblue;
    padding: 10px 30px 20px 10px
  }
</style>
