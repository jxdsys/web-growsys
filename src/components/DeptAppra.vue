<template>
    <div>
       <h2 align="center">部门评价人信息</h2>
       <div align="left" style="float: left;">
        <el-input v-model="listQuery.filter" placeholder="请输入姓名" style="width: 200px">
        </el-input>
        <el-button type="primary" @click="querys">查询</el-button>
       </div>
       <div align="right" style="float: right">
        <el-button type="primary" @click="selectAdd" >新增</el-button>
        <el-button type="primary" @click="delBatch">删除</el-button>
       </div>
       <div style="margin-top: 65px ">
         <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
           <el-form :model="form"  :rules="rules" ref="deptAppraForm">

             <el-form-item label="部门评价人姓名" :label-width="formLabelWidth" prop="deptAppraName">
               <el-input v-model="form.deptAppraName" autocomplete="off" style="width: 400px" :disabled="disabled"></el-input>
             </el-form-item>

             <el-form-item label="所属部门" :label-width="formLabelWidth" prop="deptid">
               <el-select v-model="form.deptid" placeholder="请选择部门" style="width: 400px"  :disabled="disabled">
                 <el-option v-for="dept in this.deptList" :value="dept.deptid" :label="dept.dname"></el-option>
               </el-select>
             </el-form-item>

             <el-form-item label="职务" :label-width="formLabelWidth" prop="jobid">
               <el-select v-model="form.jobid" placeholder="请选择职务" style="width: 400px">
                 <el-option v-for="job in this.jobList" :value="job.jobid" :label="job.job"></el-option>
               </el-select>
             </el-form-item>



           </el-form>
           <div slot="footer" class="dialog-footer" align="center">
             <el-button @click="closeDlog">取 消</el-button>
             <el-button type="primary" @click="addOrUpdate">确 定</el-button>
           </div>
         </el-dialog>
        <el-table
          border
          :data="tableData"
          height="375px"
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
              <el-button type="text"  @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text"  @click="del(scope.row)" >删除</el-button>
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
      <el-footer class="el-aside" style="margin-top: 30px">©金现代金桥工程第四十九期第四小组</el-footer>
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
                    ,sizes:[4,6,8]
                },
                listQuery:{//初始查询条件
                    limit:4,
                    page: 1,
                    filter:""
                },
                disabled:false,
                //总条数
                total:0
                //总页数
                ,pageCount:0
                //被选中评价人信息
                ,checkData:[]
                //表单名字
                ,dialogTitle:""
                //控制对话框的显示和影藏
                ,dialogFormVisible:false,
                isadd :false
                //定义表单数据
                ,form:{
                    deptAppraName:"",
                    jobid:"",
                    deptid:""
                },
                //文本显示宽度
                formLabelWidth:"120px",
                deptList:[],
                jobList:[],
                rules:{
                    deptAppraName:[
                        {required: true, message: '请输入评价人姓名', trigger: 'blur'},
                      {pattern: /^[\u4e00-\u9fa5]{1,5}$/, message: '请输入汉字', trigger: 'blur'}
                    ] ,
                    jobid:[
                        {required: true, message: '请选择职务', trigger: 'blur'}
                    ],
                    deptid:[
                        {required: true, message: '请选择部门', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            //查询所有信息
            getDeptAppra:function () {
                axios.post("/getDeptAppra",this.listQuery).then(res =>{
                    //返回的是对象数组
                    this.tableData = res.data.deptAppras;
                    this.total = res.data.total;
                })
            },
            //分页查询
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
            //页码变化时
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
            //获取部门信息
            getDept:function(){
                axios.get("/getDept").then(res =>{
                    this.deptList=res.data
                })
            },
            //获取职务信息
            getJob:function(){
                axios.get("/getJob").then(res =>{
                    this.jobList=res.data
                })
            },
            //打开新增页面
            selectAdd:function () {
                this.isadd =true
                this.disabled =false
                this.dialogTitle ="新增部门评价人";
                this.form={};
                this.dialogFormVisible =true;
                this.$refs.deptAppraForm.clearValidate();
            },
            //打开修改页面
            handleEdit:function (rowData) {
                this.dialogTitle="编辑部门评价人";
                this.isadd = false;
                this.disabled =true
                //根据员工编号获取信息
                axios.get("/getDeptAppraById/"+rowData.dept_appraid).then(res =>{
                    this.form = res.data;
                });
                this.dialogFormVisible=true;
                this.$refs.deptAppraForm.clearValidate();
            },
            //保存数据
            addOrUpdate:function () {
                this.$refs["deptAppraForm"].validate((valid) => {
                    if(valid){
                        axios.post("/addDeptAppra",this.form).then(res =>{
                            if(res.data.status=="success"){
                                this.form={};
                                this.dialogFormVisible=false;
                                this.getDeptAppra()
                                if(this.isadd){
                                    this.$message({
                                        message:"新增成功,该用户用户名为"+res.data.id+"，密码为123" ,
                                        type:"success"})
                                }else{
                                    this.$message({message:"修改成功", type:"success"})
                                }

                            }else{
                                this.form={};
                                this.dialogFormVisible=false;
                                this.getDeptAppra()
                                if(this.isadd){
                                    this.$message({message:"新增失败", type:"error"})
                                }else{
                                    this.$message({message:"修改失败", type:"error"})
                                }
                            }
                        })
                    }
                })
            },
            //关闭页面
            closeDlog:function () {
                //清空数据
                this.form ={};
                //关闭对话框
                this.dialogFormVisible =false
            },
            //批量删除
            delBatch:function(){
                if (this.checkData.length == 0){
                    this.$message({message:"请选中要删除的记录",type:"warning"})
                    return
                }
                this.$confirm('此操作将永久删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {//确定
                    var arrDeptAppraids=[];
                    for (var i=0;i<this.checkData.length;i++){
                        arrDeptAppraids[i]=this.checkData[i].dept_appraid;
                    }
                    axios.post("/delDeptAppra",arrDeptAppraids).then(res =>{
                        if(res.data =="success"){
                            this.querys()
                            //this.getDeptAppra()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
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
                })
            },
            //单条删除
            del:function (rowData) {
                this.$confirm('此操作将永久删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {//确定
                    var arrDeptAppraids = [];
                    arrDeptAppraids[0] = rowData.dept_appraid;
                    axios.post("/delDeptAppra", arrDeptAppraids).then(res => {
                        if (res.data == "success") {
                            this.querys()
                            //this.getDeptAppra()
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
            }
        },
        mounted(){
            //获取数据
            this.getDeptAppra()
            this.getDept();
            this.getJob();
        }
    }
</script>

<style scoped>
  .el-aside {
    background-image: linear-gradient(to bottom, #EAEDF1,#547BD8);
    line-height: 60px;
  }
</style>
