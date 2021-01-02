<template>
  <div>
    <el-container>

      <el-main>

        <div align="left">
          <el-input v-model="listQuery.filter" placeholder="请输入学校评价人姓名" style="width: 200px"></el-input>
          <el-button type="primary" @click="querySchAppra">查询</el-button>
        </div>

        <div align="right">
          <el-button type="primary" @click="showAdd">新增</el-button>
          <el-button type="primary" @click="delBatch">删除</el-button>
        </div>


        <!--  新增和编辑的对话框      -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" label-position="right" ref="schform">
            <el-form-item label="员工姓名" :label-width="formLabelWidth" prop="schAppraName">
              <el-input v-model="form.schAppraName" autocomplete="off" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择" style="width: 350px">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职日期" :label-width="formLabelWidth" prop="hiredate">
              <el-date-picker
                v-model="form.hiredate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                align="right"
                type="date"
                placeholder="选择日期"
                style="width: 350px"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
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
          <!--            prop="sch_appra_id"-->
          <!--            label="编号"-->
          <!--            width="240" align="center">-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="sch_appra_name"
            label="姓名"
            width="240" align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="240" align="center">
          </el-table-column>
          <el-table-column
            prop="hiredate"
            label="入职日期" align="center">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态" align="center">
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

      <el-footer>最终解释权归我所有</el-footer>
    </el-container>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "SchAppra",
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
          limit: 2,
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
        //这是用于获取全部的员工数据
        // axios.get("/getEmps/"+this.listQuery.limit+"/"+this.listQuery.page).then(res => {
        //参数过多的时，推荐使用post方式传参
        axios.post("/getEmps", this.listQuery).then(res => {
          //res.data返回的是json对象数组
          this.tableData = res.data.schAppra;
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
        // this.getDepts();
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
        this.$confirm('确认删除所选记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//确定
          axios.get("/delSch/" + rowData.sch_appra_id).then(res => {
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
      //alert("vue实例已经创建完成")
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
</style>

