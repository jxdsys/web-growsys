<template>
  <div>
    <h2 align="center">重置密码</h2>


    <div align="left">
      <el-input v-model="listQuery.filter" placeholder="请输入用户姓名" style="width: 200px"></el-input>
      <el-button type="primary" @click="querySchAppra">查询</el-button>
    </div>


    <el-table
      :data="tableData"
      border
      stripe
      height="378px"
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
      <el-table-column
        prop="username"
        label="姓名"
        width="240" align="center">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="240" align="center">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色" align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100" header-align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDelete(scope.row)">重置密码</el-button>
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


    <el-footer class="el-aside" style="margin-top: 30px ;">©金现代金桥工程第四十九期第四小组</el-footer>


  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Repwd",
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
        dialogTitle: "新增员工",
        //用来控制对话框的显示和隐藏
        dialogFormVisible: false,
        //定义表单数据
        form: {
          schAppraId: "",
          schAppraName: "",
          sex: "",
          hiredate: "",
          state: ""
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
        //获取全部的users数据
        axios.post("/getUsers", this.listQuery).then(res => {
          //res.data返回的是json对象数组
          this.tableData = res.data.users;
          this.total = res.data.total;
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
      addEmp: function () {
        this.$refs["schform"].validate((valid) => {
          if (valid) {
            axios.post("/addSch", this.form).then(res => {
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
      showAdd: function () {
        this.form = {};
        this.dialogTitle = "新增";
        this.dialogFormVisible = true;
      },
      handleEdit: function (rowData) {
        this.form = {};
        this.dialogTitle = "编辑";
        //根据员工编号获取员工详细信息，展示到对话框
        axios.get("/getSchById/" + rowData.sch_appra_id).then(res => {
          this.form = res.data
          this.dialogFormVisible = true;
        })
      },
      handleDelete: function (rowData) {
        this.$confirm('确认重置密码吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定
          axios.get("/repwd/" + rowData.userid).then(res => {
            if (res.data == "success") {
              this.getEmps();
              this.page.currentPage = 1;//删除后默认显示第一页
              this.$message({
                type: 'success',
                message: '重置成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '重置失败!'
              });
            }
          })
        })
      },

      handleSelectionChange: function (val) {
        //被选中的数据：行对象数组
        this.checkData = val;

      },
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
          var arrEmpnos = [];
          for (var i = 0; i < this.checkData.length; i++) {
            if (this.checkData[i].state == "忙碌") {
              alert("含授课中的教师，无法删除");
              return;
            }
            arrEmpnos[i] = this.checkData[i].sch_appra_id;
          }
          axios.post("/delBatchSch", arrEmpnos).then(res => {
            if (res.data == "success") {
              this.getEmps();
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
    },


    created() {

    },
    mounted() {
      //查询数据
      this.getEmps();
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
  .el-aside {
    background-image: linear-gradient(to bottom, #EAEDF1,#547BD8);
  }
</style>


