<template>
  <div>
  <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="950px" 	>
    <el-form :model="form" :rules="rules" label-position="right" ref="stuform" style="height: 400px">
      <el-container>
        <el-main >
          <el-row>
            <el-col :span="10" ><div class="grid-content bg-purple">
              <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="name" >
                <el-input v-model="form.stuname" autocomplete="off" style="width: 150px" readonly="isyes"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="10" :offset="1"><div class="grid-content bg-purple-light">
              <el-form-item label="籍贯" :label-width="formLabelWidth" prop="natives">
                <el-input v-model="form.natives" autocomplete="off" style="width: 150px" ></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="11"><div class="grid-content bg-purple">
              <el-form-item label="学生性别" :label-width="formLabelWidth" prop="sex">
                <el-radio v-model="form.sex" label="男">男</el-radio>
                <el-radio v-model="form.sex" label="女">女</el-radio>
              </el-form-item>
            </div></el-col>
            <el-col :span="12" ><div class="grid-content bg-purple-light" >
              <el-form-item label="婚否" :label-width="formLabelWidth" prop="marry">
                <el-radio v-model="form.marry" label="是">是</el-radio>
                <el-radio v-model="form.marry" label="否">否</el-radio>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="民族" :label-width="formLabelWidth" prop="people">
                <el-input v-model="form.people" autocomplete="off" style="width: 150px"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="10" :offset="1"><div class="grid-content bg-purple-light">
              <el-form-item label="联系电话" :label-width="formLabelWidth"  prop="tel">
                <el-input v-model.number="form.tel" autocomplete="off" style="width: 150px"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="身份号码" :label-width="formLabelWidth" prop="cardid">
                <el-input v-model="form.cardid" autocomplete="off" style="width: 150px"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="10" :offset="1"><div class="grid-content bg-purple-light">
              <el-form-item label="毕业学校" :label-width="formLabelWidth" prop="school">
                <el-input v-model="form.school" autocomplete="off" style="width: 150px"></el-input>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="10"><div class="grid-content bg-purple">
              <el-form-item label="专业" :label-width="formLabelWidth" prop="profession">
                <el-input v-model="form.profession" autocomplete="off" style="width: 150px"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="10" :offset="1"><div class="grid-content bg-purple-light">
              <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthday">
                <div class="block">
                  <el-date-picker
                    v-model="form.birthday"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width: 150px"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4.5"><div class="grid-content bg-purple-dark">
              <p style="float: left;font-size: 14px;padding: 0px 0px 0px 79px">备注</p>
            </div></el-col>
            <el-col :span="15" ><div class="grid-content bg-purple-dark">
              <el-input
                style="width: 409px; padding: 0px 0px 0px 12px"
                type="textarea"
                placeholder="请输入内容"
                maxlength="80"
                show-word-limit
                v-model="form.content">
              </el-input>
            </div></el-col>
          </el-row>


        </el-main>
        <el-aside width="300px">
          <div>
            <p style="float: left">头像</p>
          </div>

            <el-upload
              style="height: 200px;width: 200px;float: left;padding: 80px 0px 0px 0px"
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <!--require()中不能直接写变量名，路径 + 变量图片名称 + 后缀-->
              <img v-if="form.pictureAdd" :src="require('../assets/img/' + form.pictureAdd)" class="avatar">
              <i v-else class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img  :src="dialogImageUrl" alt="" height="100px" width="100px">
            </el-dialog>

        </el-aside>
      </el-container>

    </el-form>

      <div align="center" style="margin-top: 10px">
        <el-button type="primary" @click="updStu" >确定</el-button>
        <el-button type="primary" @click="isno" >取消</el-button>
    </div>

  </el-dialog>

<div style="float: left;padding: 0px 20px 0px 20px;" >

    <p style="font-size: 22px ;font-weight: bold" >我的信息</p>

  <el-row style="margin-bottom: 10px;margin-top: 10px">
    <el-col :span="1" :offset="21"><div class="grid-content bg-purple-dark">
      <el-button type="primary" @click="updInfo" style="width: 110px">修改</el-button>

    </div></el-col>
  </el-row>

    <table style="border-style: solid;border-color: black" border="1px " cellpadding="0" cellspacing="0" >
      <tr>
        <td class="width0dd ">姓名</td>
        <td class="widthcomplex">{{TableStu.stuname}}</td>
        <td class="width0dd ">性别</td>
        <td class="widthcomplex">{{TableStu.sex}}</td>
        <td class="width0dd ">民族</td>
        <td class="widthcomplex">{{TableStu.people}}</td>
        <td rowspan="4">
          <img v-if="form.pictureAdd" :src="require('../assets/img/' + form.pictureAdd)" class="avatar" width="160px" height="220px">
          <img v-else src="../assets/logo.png" class="avatar" width="160px" height="220px">
        </td>
      </tr>
      <tr>
        <td class="width0dd ">出生年月</td>
        <td class="widthcomplex">{{TableStu.birthday}}</td>
        <td class="width0dd ">籍贯</td>
        <td class="widthcomplex">{{TableStu.natives}}</td>
        <td class="width0dd ">婚否</td>
        <td class="widthcomplex">{{TableStu.marry}}</td>
      </tr>
      <tr>
        <td class="width0dd ">联系电话</td>
        <td colspan="2">{{TableStu.tel}}</td>

        <td class="width0dd ">身份证号码</td>
        <td colspan="2">{{ TableStu.cardid}}</td>


      </tr>
      <tr>
        <td class="width0dd ">毕业学校</td>
        <td colspan="2">{{TableStu.school}}</td>

        <td class="width0dd ">专业</td>
        <td colspan="2" >{{TableStu.profession}}</td>

      </tr>
      <tr>
        <td class="width0dd ">备注</td>
        <td colspan="6" >{{TableStu.content}}</td>
      </tr>
    </table>
  <el-footer class="el-aside" style="margin-top: 70px;" ><p style="line-height: 28px">©金现代金桥工程第四十九期第四小组</p></el-footer>

</div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "myinfo",
      data(){
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入日期'));
          } else if (value >=this.getdatatime()) {
            callback(new Error('选中时间不得大于当前时间!'));
          } else {
            callback();
          }
        };
          return{
            curtime:'',
            //新增或者编辑功能相关数据
            dialogTitle: "完善员工信息",
            //用来控制对话框的显示和隐藏
            dialogFormVisible: false,
            formLabelWidth: "120px",
            stuid:"",
            file:'',
            dialogImageUrl: '',
            dialogVisible: false,
            userId: '',
            uid:'',
            form:{
              stuid:"",
              stuname:"",
              sex:"",
              people:"",
              birthday:"",
              natives:"",
              marry:"",
              tel:"",
              cardid:"",
              school:"",
              profession:"",
              content:"",
              pictureAdd:"",
            },
            isother:true,
            isyes:false,
            TableStu:[],
            formwidth:'50px',
              photo:"",
            rules:{
              birthday: [
                { required: true, message: '请选择日期', trigger: 'blur' },
                {validator:validatePass2, trigger: 'blur'}
              ],
              natives:[
                {required: true, message: '请输入籍贯', trigger: 'blur'},
                {pattern: /^[\u4e00-\u9fa5]{1,5}$/, message: '请输入汉字', trigger: 'blur'},
                { min: 3, message: '长度大于3', trigger: 'blur' }
              ],
              sex: [
                { required: true, message: '请选择性别', trigger: 'change' }
              ],
              marry:[
                { required: true, message: '请选择婚否', trigger: 'change' }
              ],
              people:[
                {required: true, message: '请输入民族', trigger: 'blur'},
                {pattern: /^[\u4e00-\u9fa5]{1,5}$/, message: '请输入汉字', trigger: 'blur'}

              ],
              tel:[
                  {required: true, message: '请填写11位手机号', trigger: 'blur'},
                  {pattern:/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/, message: '手机号格式错误', trigger: 'blur'}
              ],
              cardid:[
                {required: true, message: '请输入身份证号', trigger: 'blur'},
                 {pattern:'^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',message: '输入的身份证号不正确' ,trigger:'blur'}
              ],
              school:[
                {required: true, message: '请输入毕业学校', trigger: 'blur'},
                {pattern: /^[\u4e00-\u9fa5]{1,5}$/, message: '请输入汉字', trigger: 'blur'},
                {min: 3,max:15, message: '长度大于3', trigger: 'blur' }
              ],
              profession:[
                {required: true, message: '请输入专业', trigger: 'blur'},
                {pattern: /^[\u4e00-\u9fa5]{1,5}$/, message: '请输入汉字', trigger: 'blur'},

              ],
              imageUrl:[{
                required: true,
                message: '请上传',
              }]
            }
          }
      },
      methods:{
          isUpdStu(){
            axios.post("isUpdStu",this.form.stuid).then(res => {
                 this.TableStu = res.data.data;
                this.form = res.data.data;
            })
          },
        //清除图片验证
        handleAvatarSuccess(res, file) {
          this.$refs.image.clearValidate();
        },
        beforeAvatarUpload(file) {
            //图片格式
          const isJPG = file.type === 'image/jpeg';
          //图片大小
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          if (isJPG && isLt2M) {
            this.formData = new FormData();
            this.formData.append("file1",file);
            let config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            };
            axios.post("uploadImg" ,this.formData,config ).then(res =>{
              if (res.data != null) {
                this.form.pictureAdd = res.data;
                alert("图片上传成功")
              } else {
                alert("图片上传失败");
                return;
              }
            })
          }
          return isJPG && isLt2M;
        },
        updStu(){

          this.$refs["stuform"].validate((valid) => {
            if (valid) {
              axios.post("/updStuByStuid", this.form).then(res => {
                if (res.data == "success") {
                  this.dialogFormVisible = false;
                  this.isUpdStu();
                  this.$message({
                    message: "完善学生信息成功",
                    type: "success"
                  })
                } else {
                  this.$message({
                    message: "完善学生信息失败",
                    type: "error"
                  })
                }
              })
            }
          })
        },
        updInfo(){
          this.$nextTick(() => {
            this.$refs['stuform'].clearValidate()
          })
            this.dialogFormVisible = true;
            this.isUpdStu();
        },
        getdatatime(){//默认显示今天
          this.curtime= new Date();
          var year=this.curtime.getFullYear();
          var month= this.curtime.getMonth()+1<10 ? "0"+(this.curtime.getMonth()+1) : this.curtime.getMonth()+1;
          var day=this.curtime.getDate()<10 ? "0"+this.curtime.getDate() : this.curtime.getDate();
          return year+"-"+month+"-"+day;
        },
        isno(){
          this.dialogFormVisible = false;
          this.isUpdStu();
        }
      },
      mounted(){
            this.form.stuid = sessionStorage.getItem("userName")
          this.isUpdStu();
            this.getdatatime();
          }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .width0dd{
    width: 120px;
    height: 70px;
  }
  .widthcomplex{
    width: 240px;
    height: 70px;
  }
  img{
    width: 130px;
    height: 100px;
  }
  input{
    padding: 0px 20px 0px 0px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-footer {
    background-image: linear-gradient(to bottom, #EAEDF1,#547BD8);

  }
</style>
