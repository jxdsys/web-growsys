<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="旧密码" prop="oldPass">
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
            }else {
              callback();
            }
          };
          return {
            ruleForm: {
              pass: '',
              checkPass: '',
              age: '',
              oldpass:''
            },
            userName:'',
            password:'',
            rules: {
              pass: [
                { validator: validatePass, trigger: 'blur' },
                {min: 6, max: 15, message: '长度在 6到 15 个字符', trigger: 'blur'}
              ],
              checkPass: [
                { validator: validateAgainPass, trigger: 'blur' },
                {min: 6, max: 15, message: '长度在 6到 15 个字符', trigger: 'blur'}
              ],
              oldPass:[
                { validator: validateOldPass, trigger: 'blur' },

              ]
            }
          };
        },
        methods: {
          getOldPwd(){
            axios.post("/getPwdByUserName",this.userName).then(res => {
              // alert(res.data)
              this.password = res.data.data;
            })
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              alert(this.password)
              if (this.password == this.ruleForm.oldpass) {
                if (valid) {
                  axios.post("updPwd",this.ruleForm).then(res =>{
                    if (res.data=="success"){
                      this.$message({
                        message:  "修改密码成功",
                        type: "success"
                      })
                    }else {
                      this.$message({
                        message:  "修改密码失败",
                        type: "error"
                      })
                    }
                  })
                  alert('submit!');
                } else {
                  console.log('error submit!!');
                  return false;
                }
              }else {
                this.$message({
                  message:  "旧密码不正确",
                  type: "error"
                })
              }

            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        },
      created() {
        this.userName = sessionStorage.getItem("userName")
        this.getOldPwd();
      }
    }
</script>

<style scoped>

</style>
