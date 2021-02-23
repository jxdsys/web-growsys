<template>
  <div>

    <h2 align="center" style="margin-top: auto">学校学生信息</h2>
    <div style="float: right">
      <el-select clearable v-model="this.listQuery.termid" placeholder="请选择班期" style="width: 118px" @change="clickTerm($event)">
        <el-option v-for="dept in this.termList" :value="dept.term_id" :label="dept.term_name"></el-option>
      </el-select>
    </div>

    <div align="left">
      <el-input v-model="listQuery.filter" placeholder="请输入学校评价人姓名" style="width: 200px"></el-input>
      <el-button type="primary" @click="querySchAppra">查询</el-button>
    </div>


    <el-table
      :data="tableData"
      border
      stripe
      height="395px"
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
        prop="sex"
        label="性别"
        align="center">
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校"
        align="center">
      </el-table-column>
      <el-table-column
        prop="natives"
        label="籍贯"
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
          label="java高级"
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
        fixed="right"
        label="整体评价分数"
        align="center"
        prop="apprascore"
        width="150px"
        >
        <template slot-scope="{row}">
          <el-rate v-if="row.apprascore > 0"
                   v-model="row.apprascore"
                   disabled
                   text-color="#101010"
                   :colors="scoreColors"
          >
          </el-rate>
          <el-rate v-else
                   v-model="row.apprascore"
                   disabled
                   show-score
                   text-color="#101010"

                   :colors="scoreColors"
          >
          </el-rate>
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


    <el-footer class="el-aside" style="margin-top: 30px">©金现代金桥工程第四十九期第四小组</el-footer>



  </div>
</template>

<script>
  import axios from 'axios'

  export default {

    name: "SchAppra",
    data() {
      return {
        //value2: null,
        scoreColors: ['#97A5BF', '#F7BA2A', '#FF9900'],   // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        //texts:['极差','差','一般','良好','优秀'],
        sname: "",//存储用户名
        //表格分页查询等相关数据
        tableData: [],
        apprascore:"",
        page: {
          currentPage: 1,//当前页码
          sizes: [2, 4, 6, 8, 10],
        },
        termList:[],
        listQuery: {//初始查询条件
          limit: 4,
          page: 1,
          filter: "",
          termid: "",
          userName: ""
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
        //被选中的员工信息
        checkData: []
      }
    },
    methods: {
      getEmps: function () {
        //这是用于获取全部的员工数据
        // axios.get("/getEmps/"+this.listQuery.limit+"/"+this.listQuery.page).then(res => {
        //参数过多的时，推荐使用post方式传参
        axios.post("/getSchAllStu", this.listQuery).then(res => {
          //res.data返回的是json对象数组
          this.tableData = res.data.schStuAppra;
          this.total = res.data.total;
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
      getTerm:function () {
        //alert(this.listQuery.userName)
        axios.get("/getSomeTerms/"+this.listQuery.userName).then(res => {
          //alert(this.listQuery.userName)
          this.termList = res.data.data
        })

      },
      updateTermAndTeacherState:function () {
        axios.get("/getUpdState/"+this.listQuery.userName).then(res => {
          //alert(this.listQuery.userName)
          return;
        })
      }
    },


    created() {
      //alert("vue实例已经创建完成")
    },
    mounted() {
      this.listQuery.userName = sessionStorage.getItem("userName")
      this.updateTermAndTeacherState()
      //查询数据
      this.getEmps();
      //从sessionStorage中获取用户名
      //this.uname = sessionStorage.getItem("uname");
      //获取班期
      this.getTerm();
     // this.listQuery.userName = sessionStorage.getItem("userName")
      //alert(this.listQuery.userName)

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
    line-height: 60px;
  }
</style>

