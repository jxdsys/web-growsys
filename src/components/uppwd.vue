<template>
  <div>
    <div>
      <h2 align="center">修改密码</h2>
    </div>
  <div align="center" style="width: 500px;float: left;padding: 50px 0px 0px 350px">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="旧密码" prop="oldpass">
      <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
      <el-footer class="el-aside" style="margin-top: 500px;" ><p style="line-height: 28px">©金现代金桥工程第四十九期第四小组</p></el-footer>

  </div>

</template>

<script>
  import axios from 'axios'
    export default {
        name: "uppwd",
        data() {
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
              }
              callback();
            }
          };
          var validateAgainPass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          var validateOldPass = (rule,value,callback) =>{
            if (value === '') {
              callback(new Error('请输入密码'));
            }else if (value != this.password) {
              callback(new Error('请输入正确的密码'));
            } else {
              callback();
            }
          };
          return {
            ruleForm: {
              userid:'',
              pass: '',
              checkPass: '',
              age: '',
              oldpass:'',
              userName:'',
              role:''

            },
            userName:'',
            password:'',
            rules: {
              pass: [
                { validator: validatePass, trigger: 'blur' },
                {required: true, message: '请输入密码', trigger: 'blur'},
                {min: 6, max: 15, message: '长度在 6到 15 个字符', trigger: 'blur'}
              ],
              checkPass: [
                { validator: validateAgainPass, trigger: 'blur' },
                {required: true, message: '请在此输入密码', trigger: 'blur'},
                {min: 6, max: 15, message: '长度在 6到 15 个字符', trigger: 'blur'}
              ],
              oldpass:[
                {required: true, message: '请输入旧密码', trigger: 'blur'},
                { validator: validateOldPass, trigger: 'blur' },

              ]
            }
          };
        },
        methods: {
          getOldPwd(){
            axios.post("/getPwdByUserName",this.userName).then(res => {
              // alert(res.data)
              this.password = res.data.password;
              this.ruleForm.userid = res.data.userid;
            })
          },
          submitForm(formName) {
            this.getOldPwd();
            this.$refs[formName].validate((valid) => {

                if (valid) {
                  this.ruleForm.userName = sessionStorage.getItem("userName")
                  this.ruleForm.role = sessionStorage.getItem("role");

                  axios.post("updPwd",this.ruleForm).then(res =>{
                    if (res.data=="success"){
                      this.getOldPwd();
                      this.$message({
                        message:  "修改密码成功",
                        type: "success"
                      })
                        this.ruleForm = {};

                    }else {
                      this.$message({
                        message:  "修改密码失败",
                        type: "error"
                      })
                    }
                  })
                } else {
                  console.log('error submit!!');
                  return false;
                }


            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$nextTick(() => {
              this.$refs['ruleForm'].clearValidate()
            })
          }
        },
      created() {
        this.userName = sessionStorage.getItem("userName")
        this.ruleForm.userName = sessionStorage.getItem("userName")
        this.ruleForm.role = sessionStorage.getItem("role");
        this.getOldPwd();
      }
    }
</script>

<style scoped>
  .el-aside {
    background-image: linear-gradient(to bottom, #EAEDF1,#547BD8);
  }
</style>
