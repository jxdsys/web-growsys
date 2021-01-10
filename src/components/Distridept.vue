<template>
  <div>

    <h2 align="center" style="margin-top: auto">分配部门
    </h2>


    <div align="left">
      <el-input v-model="listQuery.filter" placeholder="请输入学校评价人姓名" style="width: 200px"></el-input>
      <el-button type="primary" @click="querySchAppra">查询</el-button>
    </div>


    <!--  新增和编辑的对话框      -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="850px" class="submit-test-dialog">
      <el-form :model="form" :rules="rules" label-position="right" ref="schform">
        <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="stuname">
          <el-input v-model="form.stuname" autocomplete="off" style="width: 300px" disabled></el-input>
        </el-form-item>

        <el-form-item label="部门名称" :label-width="formLabelWidth" prop="dept">
          <el-select clearable v-model="form.deptid" placeholder="请选择部门" style="width: 300px" @change="changes">
            <el-option v-for="dept in this.deptList" :value="dept.deptid" :label="dept.dname"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="部门评价人名称" :label-width="formLabelWidth" prop="deptappra" v-if="isShow">
          <el-select clearable v-model="form.deptAppraid" placeholder="请选择部门评价人" style="width: 300px">
            <el-option v-for="appra in this.appraList" :value="appra.deptAppraid"
                       :label="appra.deptAppraName"></el-option>
          </el-select>
        </el-form-item>


      </el-form>


      <el-button @click="closeDlog" align="center">取 消</el-button>
      <el-button type="primary" @click="insertInfo" align="center">确定</el-button>

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
          <span v-if="scope.row.apprascore <=2 && scope.row.apprascore>=0">不合格</span>
          <span v-if="scope.row.apprascore >= 3&&scope.row.deptno==0" class="el-button"
                @click="distribute(scope.row)">待分配</span>
          <span v-if="scope.row.deptno!=0">已入职</span>
        </template>

        <!--        <template slot-scope="scope">-->
        <!--          <el-button type="text" align="center" @click="distribute(scope.row)">分配</el-button>-->
        <!--        </template>-->
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
    name: "Distridept",
    data() {
      return {
        isShow: "",

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
          userName: "",
        },
        //总条数
        total: 0,
        //总页数
        pageCount: 0,
        //新增或者编辑功能相关数据
        dialogTitle: "",
        //用来控制对话框的显示和隐藏
        dialogFormVisible: false,
        //分配部门后按钮不可再用
        //flag:false,
        //定义表单数据
        form: {
          stuid: "",
          stuname: "",
          deptid: "",
          deptAppraid: "",
        },
        deptList: [],
        appraList: [],
        formLabelWidth: "200px",
        //被选中的员工信息
        checkData: []
      }
    },
    methods: {
      getEmps: function () {
        //这是用于获取全部的员工数据
        // axios.get("/getEmps/"+this.listQuery.limit+"/"+this.listQuery.page).then(res => {
        //参数过多的时，推荐使用post方式传参
        axios.post("/getAllStuDistrStu", this.listQuery).then(res => {
          //res.data返回的是json对象数组
          if (res.data.schStuAppraDistri == "") {
            this.$message({
              message: "您没有需要分配部门的学生",
            })
            //alert("您没有需要分配部门的学生")
          }
          this.tableData = res.data.schStuAppraDistri;
          this.total = res.data.total;

          //this.page.currentPage=1;//默认显示第一页
        })
      },
      insertInfo: function () {
        this.$refs["schform"].validate((valid) => {
          if (valid) {
            axios.get("/insertInfoSchtoDept/" + this.form.stuid + "/" + this.form.deptid + "/" + this.form.deptAppraid).then(res => {
              if (res.data == "success") {
                this.form = {};
                this.dialogFormVisible = false;
                this.getEmps();
                // this.flag=true;

                // const loadingObj = this.$loading({
                //   lock: true,
                //   text: '提交中...',
                //   spinner: 'el-icon-loading',
                //   background: 'rgba(0, 0, 0, 0.7)',
                //   target: document.querySelector('.submit-test-dialog')
                // });
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
      distribute: function (rowData) {
        this.dialogTitle = "分配部门"
        this.dialogFormVisible = true
        //获取学生信息
        axios.post("/SchoolGetStu", rowData.stuid).then(res => {
          this.form = res.data
        })
      },
      //获取部门信息
      getDept: function () {
        axios.get("/getDept").then(res => {
          this.deptList = res.data
        })
      },
      //获取某个部门评价人信息
      getDeptAppra: function (datas) {
        axios.get("/getDeptAppraToSch/" + datas).then(res => {
          //alert(res.data)
          this.appraList = res.data
        })
      },
      //当选择部门后将部门id传到后台获取该部门下属的评价人
      changes: function () {
        if (this.form.deptid) {
          this.isShow = true
          this.getDeptAppra(this.form.deptid);
        } else {
          this.isShow = false
        }
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
      this.teachid = sessionStorage.getItem("teachid")
      //查询数据
      this.getEmps();
      //获取班期
      this.getTerm();
      //获取部门信息
      this.getDept();

    },

  }

</script>

<style scoped>
  #table1 {
    text-align: center;
    border-collapse: collapse;
    height: 150px;
    width: 100%;
  }

  table {
    text-align: center;
    border-collapse: collapse;
    width: 100%;
    height: 150px;
  }

  el-input {
    border: 0;
    width: 95%;
    height: 95%;
    text-align: center;
  }

  textarea {
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
</style>



