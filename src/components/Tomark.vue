<template>
  <div>

    <h2 align="center" style="margin-top: auto">评分 <span style="font-size: smaller">---当前班期为：0{{teachid}}</span>
    </h2>


    <div align="left">
      <el-input v-model="listQuery.filter" placeholder="请输入学校评价人姓名" style="width: 200px"></el-input>
      <el-button type="primary" @click="querySchAppra">查询</el-button>
    </div>

<!--    &lt;!&ndash;  新增和编辑的对话框      &ndash;&gt;-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="850px">
      <el-form :model="form" :rules="rules" label-position="right" ref="schform">
        <div align="center" style="border: 0px solid">
          <table border="=1" id="table1" :model="baseData">
            <tr>
              <td>姓名</td>
              <td>{{this.baseData.stuname}}</td>
              <td>性别</td>
              <td>{{this.baseData.sex}}</td>
              <td>名族</td>
              <td>{{this.baseData.people}}</td>
              <td rowspan="4">我是一张图片</td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{this.baseData.birthday}}</td>
              <td>籍贯</td>
              <td>{{this.baseData.natives}}</td>
              <td>婚否</td>
              <td>{{this.baseData.marry}}</td>
            </tr>
            <tr>
              <td>联系电话</td>
              <td colspan="2">{{this.baseData.tel}}</td>
              <td>身份证号</td>
              <td colspan="2">{{this.baseData.cardid}}</td>
            </tr>
            <tr>
              <td>毕业学校</td>
              <td colspan="2">{{this.baseData.school}}</td>
              <td>专业</td>
              <td colspan="2">{{this.baseData.profession}}</td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="6">{{this.baseData.content}}</td>
            </tr>
          </table>

          <table border="1" style="border: 1px solid">
            <tr>
              <td rowspan="2">培训学校</td>
              <td rowspan="2">班期</td>
              <td rowspan="2">评价人</td>
              <td colspan="6">培训期间成绩</td>
              <td rowspan="2">整体评价分数</td>
            </tr>
            <tr>
              <td>html笔试</td>
              <td>oracle成绩</td>
              <td>js成绩</td>
              <td>java基础</td>
              <td>java高级</td>
              <td>L1面试</td>
            </tr>
            <tr>
              <td>学习评价</td>
              <td>
                <el-form-item prop="termid" :label-width="formLabelWidth">
                <el-input v-model="form.termid" autocomplete="off" class="paperview-input-text" disabled></el-input>
                </el-form-item>
              </td>
              <td style="width: 100px">
                <el-form-item prop="sch_appra_name" :label-width="formLabelWidth">
                <el-input v-model="form.sch_appra_name" autocomplete="off"  class="paperview-input-text"  disabled></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="html">
                <el-input v-model.number="form.html" autocomplete="off"  class="paperview-input-text"  align="center"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="oracle">
                <el-input v-model.number="form.oracle" autocomplete="off"   class="paperview-input-text"  align="center"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="js">
                <el-input v-model.number="form.js" autocomplete="off"   class="paperview-input-text"  align="center"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="java">
                <el-input v-model.number="form.java" autocomplete="off"   class="paperview-input-text"  align="center"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="superjava">
                <el-input v-model.number="form.superjava" autocomplete="off"  class="paperview-input-text"  align="center"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="l1">
                <el-input v-model.number="form.l1" autocomplete="off"  class="paperview-input-text"   align="center"></el-input>
                </el-form-item>
              </td>
              <td>
                <el-form-item prop="apprascore">
                <el-input v-model.number="form.apprascore" autocomplete="off"  class="paperview-input-text"   align="center"></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>评价(优点缺点)</td>
              <td colspan="9">
                <el-form-item prop="content">
                  <el-input  type="textarea"   v-model="form.content"  class="paperview-input-textarea"  autocomplete="off" style="width: 750px;height: 50px"></el-input>
                </el-form-item>
<!--                <textarea rows="4" cols="90" style="border: 0">{{this.form.content}}</textarea>-->
              </td>
            </tr>
            <tr>
              <td colspan="10" align="center">
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="closeDlog">取 消</el-button>
                        <el-button type="primary" @click="infocommit">确定</el-button>
                      </div>
              </td>
            </tr>
          </table>
        </div>
      </el-form>
    </el-dialog>

    <el-table
      :data="tableData"
      border
      stripe
      height="360px"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        prop="stuname"
        label="姓名"
        align="center">
      </el-table-column>

      <el-table-column
        label="培训期间测试成绩"
        align="center"

      >
        <el-table-column
          prop="html"
          label="HTML笔试"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="oracle"
          label="oracle笔试"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="js"
          label="js笔试"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="java"
          label="java笔试"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="superjava"
          label="java高级笔试"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="l1"
          label="L1面试"
          align="center"
        >
        </el-table-column>
      </el-table-column>

      <el-table-column
        prop="apprascore"
        fixed="right"
        label="整体评价分数"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center">

        <template slot-scope="scope">
          <span v-if="scope.row.apprascore >= 1">已评分</span>
          <span v-else class="el-button"
                @click="setMark(scope.row)">评分</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="page.currentPage"
      :page-sizes="page.sizes"
      :page-size="this.listQuery.limit"
      :total="total"
      layout="prev,pager,next,sizes,jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>


    <el-footer>最终解释权归我所有</el-footer>


  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Tomark",
    data() {
      var checkapprascore = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }
          if (value <= 0||value>5) {
              callback(new Error('必须在1-5的数字'));
            } else {
              callback();
            }

        });
      };
      var checkscore = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }
          if (value <= 0||value>100) {
            callback(new Error('必须在1-100的数字'));
          } else {
            callback();
          }

        });
      };
      return {
        sname: "",//存储用户名
        teachid: "",
        //表格分页查询等相关数据
        tableData: [],
        page: {
          currentPage: 1,//当前页码
          sizes: [2, 4, 6, 8, 10],
        },
        termList: [],
        listQuery: {//初始查询条件
          limit: 2,
          page: 1,
          filter: "",
          userName: ""
        },
        //总条数
        total: 0,
        //总页数
        pageCount: 0,
        //新增或者编辑功能相关数据
        dialogTitle: "",
        //用来控制对话框的显示和隐藏
        dialogFormVisible: false,
        //定义表单数据
        form: {
          sch_appra_id:"",
          sch_appra_name: "",
          stuid: "",
          termid: "",
          html: "",
          oracle: "",
          java: "",
          js: "",
          superjava: "",
          l1: "",
          content: "",
          apprascore: ""
        },
        baseData:{
          //姓名
          stuname:"",
          //性别
          sex:"",
          //名族
          people:"",
          //出生日期
          birthday:"",
          //籍贯
          natives:"",
          //婚否
          marry:"",
          //联系电话
          tel:"",
          //身份证
          cardid:"",
          //学校
          school:"",
          //专业
          profession:"",
          //备注
          content:"",
          //相片
          pictureAdd:"",
        },
        formLabelWidth: "20px",
        deptList: [],
        rules: {
            content:[
                {required: true, message: '请输入', trigger: 'blur'}
            ],
          apprascore: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
          apprascore: [
            { validator: checkapprascore, trigger: 'blur' }
          ],
          html:[
            { validator: checkscore, trigger: 'blur' }
          ],
          oracle:[
            {validator: checkscore, trigger: 'blur'}
          ],
          js:[
            {validator: checkscore, trigger: 'blur'}
          ],
          superjava:[
            {validator: checkscore, trigger: 'blur'}
          ],
          java:[
            {validator: checkscore, trigger: 'blur'}
          ],
          l1:[
            {validator: checkscore, trigger: 'blur'}
          ]


        },
        //被选中的员工信息
        checkData: []
      }
    },
    methods: {
      getEmps: function () {
        //这是用于获取全部的员工数据
        // axios.get("/getEmps/"+this.listQuery.limit+"/"+this.listQuery.page).then(res => {
        //参数过多的时，推荐使用post方式传参
        axios.post("/getSchOneTermStu", this.listQuery).then(res => {
          //res.data返回的是json对象数组
          if (res.data.schStuAppra == null) {
            this.$message({
              message: "您没有需要评价的学生",
            })
            // alert("您没有需要评价的学生")
          }
          this.tableData = res.data.schStuAppra;
          this.total = res.data.total;

          //this.page.currentPage=1;//默认显示第一页
        })
      },
      infocommit: function () {

        this.$refs["schform"].validate((valid) => {
          if (valid) {
            axios.post("/tocommit", this.form).then(res => {
              if (res.data == "success") {
                this.form = {};
                this.dialogFormVisible = false;
                this.getEmps();
                this.$message({
                  message: this.dialogTitle + "成功",
                  type: "success"
                })
              } else {
                this.form = {};
                this.dialogFormVisible = false;
                this.getEmps();
                this.$message({
                  message: this.dialogTitle + "失败",
                  type: "error"
                })
              }
            })
          }
        })

      },
      setMark:function (rowData) {
        this.dialogTitle ="评分"
        this.dialogFormVisible=true
        this.$nextTick(() => {
          this.$refs['schform'].clearValidate()
        });
        //获取员工个人的详细信息
        axios.post("/SchoolGetStu",rowData.stuid).then(res => {
          //this.form =res.data
          this.baseData=res.data
        })
        axios.get("/getOneStuById/" + rowData.stuid).then(res => {
          this.form = res.data
          this.dialogFormVisible = true;
        })
      },
      getThatTerm: function () {

        axios.get("/getThatTerm/" + this.listQuery.userName).then(res => {
          //res.data返回的是json对象数组
          // if (res.data==0) {
          //  return;
          // }else {
          sessionStorage.setItem("teachid", res.data)
          // }


          //this.page.currentPage=1;//默认显示第一页
        })
      },
      clickTerm(data) {
        this.listQuery.termid = data;
        this.getEmps();
      },
      querySchAppra: function () {
        //设置传递到后台
        this.listQuery.page = 1;
        this.getEmps();
        this.page.currentPage = 1;//默认显示第一页

      },

      handleSizeChange: function (val) {
        //当每页显示条数发生变化时，触发该事件
        //需要根据当前参数重新去后台查询数据
        this.listQuery.limit = val;
        this.listQuery.page = 1;//从第一页开始查询
        this.page.currentPage = 1;//默认显示第一页
        this.getEmps();
      },
      handleCurrentChange: function (val) {
        //当前页码发生变化时，触发该事件
        //获取当前页码赋值给this.listQuery.page,然后调用getEmps方法
        //val代表当前页码

        this.listQuery.page = val;
        this.getEmps();
      },

      //获取某个评价人下的班期信息
      getTerm: function () {
        //alert(this.listQuery.userName)
        axios.get("/getSomeTerms/" + this.listQuery.userName).then(res => {
          //alert(this.listQuery.userName)
          this.termList = res.data.data
        })

      },
      handleEdit: function (rowData) {
        // alert(rowData.stuid)
        this.form = {};
        this.dialogTitle = "打分";

        //根据员工编号获取员工详细信息，展示到对话框
        axios.get("/getOneStuById/" + rowData.stuid).then(res => {
          this.form = res.data
          this.dialogFormVisible = true;
        })
        this.$refs.schform.clearValidate();
      },
      //对话框中的取消按钮事件
      closeDlog: function () {
        //清空数据
        this.form = {};
        //关闭对话框
        this.dialogFormVisible = false
      },
    },


    created() {
      //alert("vue实例已经创建完成")
    },
    mounted() {
      this.listQuery.userName = sessionStorage.getItem("userName");
      this.getThatTerm();
      this.teachid = sessionStorage.getItem("teachid")
      //获取班期
      this.getTerm();
      //查询数据
      this.getEmps();
      //从sessionStorage中获取用户名
      //this.uname = sessionStorage.getItem("uname");

      this.getThatTerm();
      // this.listQuery.userName = sessionStorage.getItem("userName")
      //alert(this.listQuery.userName)

    },

  }

</script>

<style scoped>
  #table1{
    text-align: center;
    border-collapse: collapse;
    height: 150px;
    width: 100%;
  }
  table{
    text-align: center;
    border-collapse: collapse;
    width: 100%;
    height: 150px;
  }
 el-input{

    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 0px;//改成0，边框就消失了！
  width: 100%;

  }
  textarea{
    border: 0;
    width: 98%;
    height: 98%;

  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  /*.el-aside {*/
  /*  background-color: #D3DCE6;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 200px;*/
  /*}*/

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 475px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .paperview-input-text >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    /*padding: 1%;*/
    border: 0px;
    width: 75px;
    height:40px;
  }
  .paperview-input-textarea >>> .el-textarea__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    outline: none;
    border: 0px;
    width: 100%;
  }



</style>


