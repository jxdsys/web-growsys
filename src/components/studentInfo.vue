<template>
  <div>
    <el-container>
      <h2 align="center">学生信息</h2>
      <el-main>
        <div style="float: left ;padding: 5px 5px 5px 0px">
          <el-select v-model="this.listQuery.termid" placeholder="请选择班期" style="width: 150px" @change="clickTerm($event)" clearable>
            <el-option v-for="dept in this.termList" :value="dept.term_id" :label="dept.term_name"></el-option>
          </el-select>
        </div>

        <div align="left"style="float: left ;padding: 5px 0px 5px 5px">
          <el-input v-model="listQuery.filter" placeholder="请输入学生姓名" style="width: 200px"></el-input>
          <el-button type="primary" @click="queryStus">查询</el-button>
        </div>
        <div align="right" style="float: right ;padding: 5px 0px 5px 5px" >
          <el-button type="primary" @click="showAdd">新增</el-button>
          <el-button type="primary" @click="delBatch">删除</el-button>
        </div>


        <!--  新增和编辑的对话框      -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">


          <el-form :model="form" :rules="rules" label-position="right" ref="empform">
            <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="stuname">
              <el-input v-model="form.stuname" autocomplete="off" style="width: 350px" ></el-input>
            </el-form-item>
            <el-form-item label="学生性别" :label-width="formLabelWidth" prop="sex">
              <el-radio v-model="form.sex" label="男">男</el-radio>
              <el-radio v-model="form.sex" label="女">女</el-radio>
            </el-form-item>

            <el-form-item label="所属班期" :label-width="formLabelWidth" prop="termid">
              <el-select v-model="form.termid" placeholder="请选择所属班期" style="width: 350px" >
                <el-option v-for="term in this.freeTerm" :value="term.term_id" :label="term.term_name"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer" align="center">
            <el-button @click="closeDlog">取 消</el-button>
            <el-button type="primary" @click="addEmp">确定</el-button>
            <!--            <el-button type="primary" @click="editEmp">确定修改</el-button>-->
          </div>
        </el-dialog>


        <el-table
          :data="tableData"
          border
          stripe
          height="360px"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="75" align="center">
          </el-table-column>
          <el-table-column
            label="序号"
            type="index"
            width="80" align="center">
          </el-table-column>
          <!--          <el-table-column-->
          <!--            prop="empno"-->
          <!--            label="员工id"-->
          <!--            width="240" align="center">-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="stuname"
            label="学生姓名"
            width="240" align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="学生性别"
            width="240" align="center">
          </el-table-column>
          <el-table-column
            prop="term_name"
            label="所属班期" align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100" header-align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
      </el-main>
      <el-footer class="el-aside">©金现代金桥工程第四十九期第四小组</el-footer>
    </el-container>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "studentInfo",
    data() {
      return {
        uname:"",//存储用户名

        //表格分页查询等相关数据
        tableData: [],
        page: {
          currentPage: 1,//当前页码
          sizes: [ 4, 6, 8, 10],
        },
        listQuery: {//初始查询条件
          limit: 4,
          page: 1,
          filter: "",
          termid:""
        },
        freeTerm:[],
        //总条数
        total: 0,
        //总页数
        pageCount: 0,
        //新增或者编辑功能相关数据
        dialogTitle: "新增学员",
        //用来控制对话框的显示和隐藏
        dialogFormVisible: false,
        //定义表单数据
        form: {
          stuid: "",
          stuname: "",
          sex: "",
          termid: ""
        },
        formLabelWidth: "150px",
        rules: {
          stuname: [
            {required: true, message: '请输入学生姓名', trigger: 'blur'},
            {pattern: /^[\u4e00-\u9fa5]{1,5}$/, message: '请输入汉字', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'blur'}
          ],
          termid: [
            {required: true, message: '请选择所属班期', trigger: 'blur'}
          ]
        },
        //被选中的员工信息
        checkData: [],
        termList:[]
      }
    },
    methods: {
      getStus: function () {
        //这是用于获取全部的员工数据
        // axios.get("/getEmps/"+this.listQuery.limit+"/"+this.listQuery.page).then(res => {
        //参数过多的时，推荐使用post方式传参
        axios.post("/stuInfo", this.listQuery).then(res => {
          //res.data返回的是json对象数组
          this.tableData = res.data.data;
          this.total = res.data.total;
          //this.page.currentPage=1;//默认显示第一页
        })
      },
      //获取已分配老师并且未结课的班期
      getBusyTerm(){
        axios.post("getBusyTerm").then(res =>{
          if (res.data.count = "200") {
            this.freeTerm = res.data.data;
          }else {
            this.$message({
              message: "未结课的班期全部未分配老师",
              type: "error"
            })
          }
        })

      },
      clickTerm(data){
        this.listQuery.termid = data;
        this.getStus();
      },
      //获取所有班期信息
      getTerm(){
        axios.post("/getAllTerms").then(res =>{
          this.termList = res.data.data
        })

      },
      queryStus: function () {
        //设置传递到后台
        this.listQuery.page = 1;
        this.getStus();
        this.page.currentPage = 1;//默认显示第一页

      },

      handleSizeChange: function (val) {
        //当每页显示条数发生变化时，触发该事件
        //需要根据当前参数重新去后台查询数据
        this.listQuery.limit = val;
        this.listQuery.page = 1;//从第一页开始查询
        this.page.currentPage = 1;//默认显示第一页
        this.getStus();
      },
      handleCurrentChange: function (val) {
        //当前页码发生变化时，触发该事件
        //获取当前页码赋值给this.listQuery.page,然后调用getEmps方法
        //val代表当前页码
        this.listQuery.page = val;
        this.getStus();
      },
      //新增对话框中的取消按钮事件
      closeDlog: function () {
        //清空数据
        this.form = {};
        this.getBusyTerm();
        //关闭对话框
        this.dialogFormVisible = false
      },
      addEmp: function () {
        this.$refs["empform"].validate((valid) => {
          if (valid) {
            axios.post("/addOrUpdStu", this.form).then(res => {
              if (res.data.count == "success") {
                this.form = {};
                this.dialogFormVisible = false;
                this.getStus();
                this.$message({
                  message: this.dialogTitle + "成功"+res.data.data,
                  type: "success"
                })
              } else {
                this.form = {};
                this.dialogFormVisible = false;
                this.getStus();
                this.$message({
                  message: this.dialogTitle + "失败",
                  type: "error"
                })
              }
            })
          }
        })

      },
      showAdd: function () {
        // this.getDepts();
        this.$nextTick(() => {
          this.$refs['empform'].clearValidate()
        })
        this.getBusyTerm();
        this.form = {};
        this.dialogTitle = "新增学生";
        this.dialogFormVisible = true;
      },
      handleEdit: function (rowData) {
        this.$nextTick(() => {
          this.$refs['empform'].clearValidate()
        })
        this.getBusyTerm();
        this.form = {};
        this.dialogTitle = "编辑学生";
        //根据员工编号获取员工详细信息，展示到对话框
        axios.get("/getStuById/" + rowData.stuid).then(res => {

          this.form = res.data
          this.dialogFormVisible = true;
        })
      },

      handleSelectionChange: function (val) {
        //被选中的数据：行对象数组
        this.checkData = val;

      },
      //多删
      delBatch: function () {
        if (this.checkData.length == 0) {
          this.$message({
            message: "请选择要删除的记录",
            type: "warning"
          });
          return;
        }
        this.$confirm('确认删除所选记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定
          var arrstuids = [];
          for (var i = 0; i < this.checkData.length; i++) {
            arrstuids[i] = this.checkData[i].stuid;
          }
          axios.post("/delBatchStu", arrstuids).then(res => {
            if (res.data == "success") {
              this.getStus();
              this.page.currentPage = 1;//删除后默认显示第一页
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //单删
      handleDelete: function (rowData) {
        this.$confirm('确认删除所选记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定
          axios.post("/delStu" , rowData.stuid).then(res => {
            if (res.data == "success") {
              this.getStus();
              this.page.currentPage = 1;//删除后默认显示第一页
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        })
      },
    },


    created() {
      //alert("vue实例已经创建完成")
    },
    mounted() {
      //查询数据
      this.getStus();
      this.getTerm();
      this.getBusyTerm();
    },

  }

</script>

<style scoped>
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
  .el-aside {
    background-image: linear-gradient(to bottom, #EAEDF1,#547BD8);
  }
</style>
