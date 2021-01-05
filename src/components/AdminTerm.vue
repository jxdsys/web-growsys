<template>
  <div>
    <h2 align="center">维护班期</h2>

        <div align="left" style="float: left">
          <el-input v-model="listQuery.filter" placeholder="请输入学校评价人姓名" style="width: 200px"></el-input>
          <el-button type="primary" @click="querySchAppra">查询</el-button>
        </div>

        <div align="right" style="float: right">
          <el-button type="primary" @click="showAdd">新增班期</el-button>
        </div>


        <!--  新增和编辑的对话框      -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" label-position="right" ref="schform">
            <el-form-item label="班期" :label-width="formLabelWidth" prop="termName">
              <el-input v-model="form.termName" autocomplete="off" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="班期状态" :label-width="formLabelWidth" prop="flag">
              <el-input v-model="form.flag" autocomplete="off" style="width: 350px"></el-input>
            </el-form-item>

            <el-form-item label="任课老师" :label-width="formLabelWidth" prop="sch_appra_id">
              <el-select v-model="form.schAppraId" placeholder="请选择任课老师" style="width: 350px">
                <el-option v-for="schoolappra in this.schoolappraList" :value="schoolappra.schAppraId" :label="schoolappra.schAppraName"></el-option>
              </el-select>
            </el-form-item>

          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="closeDlog">取 消</el-button>
            <el-button type="primary" @click="addAppra">确定</el-button>
          </div>
        </el-dialog>

        <div style="margin-top: 70px"></div>

        <el-table
          :data="tableData"
          border
          stripe
          height="335px"
          style="width: 100%"
          @selection-change="handleSelectionChange">


          <el-table-column
            label="序号"
            type="index"
            width="80" align="center">
          </el-table-column>
          <el-table-column
            prop="term_name"
            label="班期"
            width="240" align="center">
          </el-table-column>
          <el-table-column
            prop="sch_appra_name"
            label="教师姓名"
            width="240" align="center">
          </el-table-column>
          <el-table-column
            prop="flag"
            label="班期状态" align="center">
          </el-table-column>
          <el-table-column
            prop="state"
            label="教师状态" align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100" header-align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="distriTeacher(scope.row)">分配教师</el-button>
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
    name: "AdminTerm",
    data() {
      return {
        sname: "",//存储用户名

        //表格分页查询等相关数据
        tableData: [],
        page: {
          currentPage: 1,//当前页码
          sizes: [2, 4, 6, 8, 10],
        },
        listQuery: {//初始查询条件
          limit: 4,
          page: 1,
          filter: ""
        },
        //总条数
        total: 0,
        //总页数
        pageCount: 0,
        //新增或者编辑功能相关数据
        dialogTitle: "分配教师",
        //用来控制对话框的显示和隐藏
        dialogFormVisible: false,
        //定义表单数据
        form: {
          termName:"",
          flag:"",
          schAppraId:"",
        },
        formLabelWidth: "150px",
        deptList: [],
        rules: {
          ename: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'blur'}
          ],
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
        axios.post("/getTerm", this.listQuery).then(res => {
          //res.data返回的是json对象数组
          this.tableData = res.data.terms;
          this.total = res.data.total;
          //this.page.currentPage=1;//默认显示第一页
        })
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
      //新增对话框中的取消按钮事件
      closeDlog: function () {
        //清空数据
        this.form = {};
        //关闭对话框
        this.dialogFormVisible = false
      },
      addAppra: function () {
        this.$refs["schform"].validate((valid) => {
          if (valid) {
            axios.get("/addAppra/"+this.form.schAppraId+"/"+this.form.termId).then(res => {
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
      getSchAppra: function () {
        axios.get("/getTeachers").then(res => {
          this.schoolappraList = res.data;
        })
      },
      showAdd: function () {
        this.$confirm('确认新增班期吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定
          axios.post("/addTerm").then(res => {
            if (res.data == "success") {
              this.getEmps();
              this.page.currentPage = 1;//删除后默认显示第一页
              this.$message({
                type: 'success',
                message: '新增班期成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '新增失败!'
              });
            }
          })
        })
      },
      distriTeacher: function (rowData) {
        //this.getSchAppra();
        this.form = {};
        this.dialogTitle = "分配老师";
        //根据编号获取详细信息，展示到对话框
        axios.get("/getThisTerm/" + rowData.term_id).then(res => {
          this.form = res.data
          this.dialogFormVisible = true;
        })
          this.getSchAppra();
      },

      handleSelectionChange: function (val) {
        //被选中的数据：行对象数组
        this.checkData = val;

      },
    },


    created() {
      //alert("vue实例已经创建完成")
    },
    mounted() {
      //查询数据
      this.getEmps();
      this.getSchAppra();
      //从sessionStorage中获取用户名
      this.uname = sessionStorage.getItem("uname");
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
</style>


