<template>
  <div>
    <h2 align="center">已评分员工</h2>
    <div align="left" style="float: left;">
      <el-input v-model="listQuery.filter" placeholder="请输入姓名" style="width: 200px">
      </el-input>
      <el-button type="primary"  @click="querys">查询</el-button>
    </div>
    <div align="right" style="float: right">
      <el-input v-model="dept" :value="dept"
                style="" readonly></el-input>
    </div>
    <div style="margin-top: 65px ;margin-bottom: 40px">
      <el-table
        border
        :data="tableData"
        height="420px"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="50"
          align="center">
        </el-table-column>
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
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          label="培训期间测试成绩"
          align="center"
        >
          <el-table-column
            prop="html"
            label="html"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="oracle"
            label="oracle"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="js"
            label="js"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="java"
            label="java"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="superjava"
            label="java高级"
            width="60"
            align="center">
          </el-table-column>
          <el-table-column
            prop="l1"
            label="L1面试"
            width="60"
            align="center">
          </el-table-column>
        </el-table-column>

        <el-table-column
          prop="apprascore"
          label="学校评价"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score0"
          label="转正评价"
          align="center"
          width="70"
        >
        </el-table-column>

        <el-table-column
          prop="score1"
          label="一年评价"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score2"
          label="两年评价"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score3"
          label="三年评价"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" >查看</el-button>
            <el-button type="text"  >修改</el-button>
          </template>
        </el-table-column>
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
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>

  </div>
</template>

<script>
    import axios from 'axios'
    export default {
        //查询表信息
        name: 'EmpMain',
        data() {
            return {
                dept:"",
                //dept:"",
                tableData:[]
                ,page:{
                    currentPage:1//当前页码
                    ,sizes:[4,6,8]
                },
                listQuery:{//初始查询条件
                    limit:4,
                    page: 1,
                    filter:"",
                    userName:"",
                },
                //总条数
                total:0
                //总页数
                ,pageCount:0
                //被选中评价人信息
                ,checkData:[],
                //userName:sessionStorage.getItem("userName")
            }
        },
        methods: {
            //查询所有信息
            getAllEmpInfo: function () {
                axios.post("/getAllEmpInfo", this.listQuery).then(res => {
                    //返回的是对象数组
                    this.getDept();
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                })
            },
            //分页查询
            handleSizeChange: function (val) {
                //每页显示条数是触发该事件
                //需要根据当前参数重新去后台查询数据
                // 获取当前页码，复制给this.listQuery.page，
                this.listQuery.limit = val;
                //从第一页开始查询
                this.listQuery.page = 1;
                //默认显示在第一页
                this.page.currentPage = 1
                this.getAllEmpInfo();
            },
            //页码变化时
            handleCurrentChange: function (val) {
                //当前页码发生变化时触发
                //需要重新查询
                // 获取当前页码，复制给this.listQuery.page，
                this.listQuery.page = val;
                this.getAllEmpInfo();
            },
            handleSelectionChange: function (val) {
                //修改当前选中项,val：被选中的数据，行对象数组
                this.checkData = val;
            },
            querys: function () {
                //设置传递到后台的页码为一
                this.page.currentPage = 1;
                this.listQuery.page = 1;
                this.getAllEmpInfo();
            },
            //查询该登录者属于哪一个部门
            getDept: function () {
                axios.post("/getOneDept",this.listQuery.userName).then(res => {
                    if(res.data.staus=="200"){
                        this.dept =res.data.dept
                    }else{
                        this.dept ="";
                    }
                })
            },
        },
        mounted(){
            //获取数据
            this.listQuery.userName =sessionStorage.getItem("userName")
            this.getDept()
            this.getAllEmpInfo()
            // this.getDept()
        }
    }
</script>

<style scoped>

</style>

