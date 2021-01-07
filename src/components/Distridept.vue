<template>
  <div>

    <h2 align="center" style="margin-top: auto">分配部门
    </h2>


    <div align="left">
      <el-input v-model="listQuery.filter" placeholder="请输入学校评价人姓名" style="width: 200px"></el-input>
      <el-button type="primary" @click="querySchAppra">查询</el-button>
    </div>


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
          <el-button type="text" align="center" @click="setMark(scope.row)">分配</el-button>
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
    name: "Distridept",
    data() {
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
        axios.post("/getAllStuDistrStu", this.listQuery).then(res => {
          //res.data返回的是json对象数组
          if (res.data.schStuAppraDistri == null) {
            this.$message({
              message: "您没有需要评价的学生",
            })
            // alert("您没有需要评价的学生")
          }
          this.tableData = res.data.schStuAppraDistri;
          this.total = res.data.total;

          //this.page.currentPage=1;//默认显示第一页
        })
      },
      infocommit: function () {

        this.$refs["schform"].validate((valid) => {
          if (valid) {
            alert(this.form.sch_appra_id)
            //alert(this.form.L1)
            axios.post("/tocommit", this.form).then(res => {
              alert(this.form.sch_appra_id)
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
      this.teachid = sessionStorage.getItem("teachid")
      //查询数据
      this.getEmps();
      //从sessionStorage中获取用户名
      //this.uname = sessionStorage.getItem("uname");
      //获取班期
      this.getTerm();
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
    border: 0;
    width: 95%;
    height: 95%;
    text-align: center;
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
</style>



