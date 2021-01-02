<template>
    <div>
       <h2 align="center">部门评价人信息</h2>
       <div align="left" style="float: left;">
        <el-input v-model="listQuery.filter" placeholder="请输入姓名" style="width: 200px">
        </el-input>
        <el-button type="primary" @click="querys">查询</el-button>
       </div>
       <div align="right" style="float: right">
        <el-button type="primary" >新增</el-button>
        <el-button type="primary" >删除</el-button>
       </div>
       <div style="margin-top: 65px">
        <el-table
          :data="tableData"
          border
          strpe
          height="460px"
          :row-style="{height:'52px'}"
          :cell-style="{padding:'5px 0'}"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop="dept_appra_name"
            label="部门评价人姓名"
            width="200"
            align="center">
          </el-table-column>
          <el-table-column
            prop="job"
            label="职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="dname"
            label="所属部门"
            align="center">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            align="center">
            <template slot-scope="scope">
              <el-button type="text"  >编辑</el-button>
              <el-button type="text"  >删除</el-button>
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
           @current-change="handleCurrentChange">
         </el-pagination>
      </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'DeptEvaluation',
        data() {
            return {
                tableData:[]
                ,page:{
                    currentPage:1//当前页码
                    ,sizes:[2,4,6,8,10]
                },
                listQuery:{//初始查询条件
                    limit:4,
                    page: 1,
                    filter:""
                },
                //总条数
                total:0
                //总页数
                ,pageCount:0
                ,checkData:[]
            }
        },
        methods:{
            getDeptAppra:function () {
                axios.post("/getDeptAppra",this.listQuery).then(res =>{
                    //返回的是对象数组
                    this.tableData = res.data.deptAppras;
                    this.total = res.data.total;
                })
            },
            handleSizeChange:function (val) {
                //每页显示条数是触发该事件
                //需要根据当前参数重新去后台查询数据
                // 获取当前页码，复制给this.listQuery.page，
                this.listQuery.limit = val;
                //从第一页开始查询
                this.listQuery.page = 1;
                //默认显示在第一页
                this.page.currentPage=1
                this.getDeptAppra();
            },
            handleCurrentChange:function (val) {
                //当前页码发生变化时触发
                //需要重新查询
                // 获取当前页码，复制给this.listQuery.page，
                this.listQuery.page = val;
                this.getDeptAppra();
            },
            handleSelectionChange:function(val){
                //修改当前选中项,val：被选中的数据，行对象数组
                this.checkData = val;
            },
            querys:function(){
                //设置传递到后台的页码为一
                this.page.currentPage=1;
                this.listQuery.page=1;
                this.getDeptAppra();
            },
            getDept:function(){
                axios.get("/getDept").then(res =>{
                    this.deptList=res.data
                })
            },
        },
        mounted(){
            //获取数据
            this.getDeptAppra()
        }
    }
</script>

<style scoped>

</style>
