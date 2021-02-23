<template>
  <div>
    <h2 align="center">员工评分</h2>
    <div align="left" style="float: left;">
      <el-input v-model="listQuery.filter" placeholder="请输入姓名" style="width: 200px">
      </el-input>
      <el-button type="primary" @click="querys">查询</el-button>
    </div>
    <div align="right" style="float: right;text-align: right;width: 120px" >
      <el-input v-model="dept" :value="dept"
                style="" readonly style="text-align: center" ></el-input>
    </div>
    <div style="margin-top: 65px ;margin-bottom: 25px">
      <el-dialog :title="FormTitle" :visible.sync="dialogFormVisible" >
        <div align="center" >
          <table border="=1" id="table1" :model="baseData">
            <tr>
              <td>姓名</td>
              <td>{{this.baseData.stuname}}</td>
              <td>性别</td>
              <td>{{this.baseData.sex}}</td>
              <td>名族</td>
              <td>{{this.baseData.people}}</td>
              <td rowspan="4" style="width: 100px">
                <img v-if="baseData.pictureAdd" :src="require('../assets/img/' + baseData.pictureAdd)" class="avatar" width="100px" >
                <img v-else src="../assets/logo.png" class="avatar" width="100px"></td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{this.baseData.birthday}}</td>
              <td>籍贯</td>
              <td>{{this.baseData.natives}}</td>
              <td>婚否</td>
              <td>{{this.baseData.marry}}</td>
            </tr>
            <tr>
              <td>联系电话</td>
              <td colspan="2">{{this.baseData.tel}}</td>
              <td>身份证号</td>
              <td colspan="2">{{this.baseData.cardid}}</td>
            </tr>
            <tr>
              <td>毕业学校</td>
              <td colspan="2">{{this.baseData.school}}</td>
              <td>专业</td>
              <td colspan="2">{{this.baseData.profession}}</td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="6">{{this.baseData.content}}</td>
            </tr>
          </table>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                   style="margin-left: 180px">
            <el-menu-item index="1" @click="toMark1" :disabled="disabled1">转正评价</el-menu-item>
            <el-menu-item index="2" @click="toMark2"  :disabled="disabled2">一年评价</el-menu-item>
            <el-menu-item index="3" @click="toMark3" :disabled="disabled3">两年评价</el-menu-item>
            <el-menu-item index="4" @click="toMark4"  :disabled="disabled4">三年评价</el-menu-item>
          </el-menu>
<!--          <el-input v-model="form.stem" class="paperview-input-text" />-->
          <el-form :model="form" ref="empForm" :rules="useInfoFormRules" >
            <table border="1" style="border: 1px solid" :model="baseData1" >
              <tr>
                <td rowspan="2" style="height: 30px">项目</td>
                <td rowspan="2">员工部门</td>
                <td rowspan="2">员工职务</td>
                <td rowspan="2">评价人</td>
                <td colspan="5">评价分项</td>
                <td rowspan="2">整体评价分数</td>
              </tr>
              <tr>
                <td style="height: 20px">能力</td>
                <td>积极性</td>
                <td>沟通交流</td>
                <td>人品</td>
                <td>性格</td>
              </tr>
              <tr style="line-height: 20px">
                <td style="height: 30px ;padding-top: 12px" valign="top">工作评分</td>
                <td valign="top" style="padding-top: 12px">{{this.baseData1.dname}}</td>
                <td valign="top" style="padding-top: 12px">{{this.baseData1.job}}</td>
                <td valign="top" style="padding-top: 12px">{{this.baseData1.dept_appra_name}}</td>
                <td>
                  <el-form-item  prop="ability">
                    <el-input v-model.number="form.ability" type="text" :readonly="readonly" class="paperview-input-text" />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item  prop="activity">
                    <el-input v-model.number="form.activity" type="text" :readonly="readonly" class="paperview-input-text" />
                  </el-form-item>
                </td>
                <td>

                  <el-form-item  prop="communication">
                    <el-input v-model.number="form.communication" type="text" :readonly="readonly" class="paperview-input-text" />
                  </el-form-item>

                </td>
                <td>

                  <el-form-item  prop="moralQuality">
                    <el-input v-model.number="form.moralQuality" type="text" :readonly="readonly" class="paperview-input-text" />
                  </el-form-item>

                </td>
                <td>

                  <el-form-item  prop="disposition">
                    <el-input v-model.number="form.disposition" type="text" :readonly="readonly" class="paperview-input-text" />
                  </el-form-item>
                </td>
                <td>

                  <el-form-item  prop="score">
                    <el-input v-model.number="form.score" type="text" :readonly="readonly" class="paperview-input-text" />
                  </el-form-item>

                </td>
              </tr>
              <tr >
                <td >评价(优缺点)</td>
                <td colspan="9">
                  <el-form-item prop="estimated">
                    <el-input type="textarea"
                              placeholder="评价"
                              show-word-limit
                              v-model="form.estimated"
                              :readonly="readonly"
                              class="paperview-input-textarea" />
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td colspan="10" align="center">
                </td>
              </tr>
            </table>
            <div style="margin-top: 10px">
              <el-button @click="closeDlog">取 消</el-button>
              <el-button type="primary" @click="updateScore" :disabled="disabled5">保存</el-button>
            </div>

          </el-form>
        </div>
      </el-dialog>
      <el-table
        border
        :data="tableData"
        height="385px"
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
          width="70"
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
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score0"
          label="转正评价"
          align="center"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="score1"
          label="一年评价"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score2"
          label="两年评价"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score3"
          label="三年评价"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.score3 !=0 && scope.row.score3 !=null" >已打分</el-button>
            <el-button type="text" v-if="scope.row.score3 ==null ||scope.row.score3==0"
                  class="el-button" @click="setMark(scope.row)">打分</el-button>
            <el-button type="text" @click="selectEmpInfo(scope.row) ">查看</el-button>
            <el-button type="text" @click="revise(scope.row) ">修改</el-button>
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
    <el-footer class="el-aside" ><p style="line-height: 28px">©金现代金桥工程第四十九期第四小组</p></el-footer>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
        //查询表信息
        name: 'EmpMain',
        data() {
            var checkAbility = (rule, value, callback) => {
                    if (!value) {
                        return callback(new Error('不能为空'));
                    }
                    setTimeout(() => {
                        if (!Number.isInteger(value)) {
                            callback(new Error('请输入数字'));
                        } else {
                            if (100<value || value < 1) {
                                callback(new Error('评分为百分制'));
                            } else {
                                callback();
                            }
                        }
                    });
                };
            var checkScore = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字'));
                    } else {
                        if (5<value || value < 1) {
                            callback(new Error('评分为5分制'));
                        } else {
                            callback();
                        }
                    }
                });
            };
            return {
                empForm:{
                    ability:"",
                    score:"",
                    estimated: "",
                    activity: "",
                    communication: "",
                    moralQuality: "",
                    disposition: "",
                },
                dept: "",
                asd:"评分",
                //修改评分标志
                updateEmpScore:false,
                readonly:false,
                disabled1: true,
                disabled2: true,
                disabled3: true,
                disabled4: true,
                disabled5: false,
                //当前时间
                curtime:"",
                //日期的差值
                num:"",
                //表数据
                tableData: []
                , page: {
                    currentPage: 1//当前页码
                    , sizes: [3,4, 6, 8]
                },
                listQuery: {//初始查询条件
                    limit:4,
                    page: 1,
                    filter: "",
                    //登录用户的名字
                    userName: "",
                },
                //总条数
                total: 0
                //总页数
                , pageCount: 0
                //被选中评价人信息
                , checkData: [],
                //表单名字
                FormTitle: "",
                //表单页面状态
                dialogFormVisible: false,
                form: {
                    dateid: "",
                    stuid: "",
                    //评价
                    estimated: "",
                    //能力
                    ability: "",
                    //积极性
                    activity: "",
                    //沟通交流
                    communication: "",
                    //renpin
                    moralQuality: "",
                    //性格
                    disposition: "",
                    //总评
                    score: ""
                },
                baseData: {
                    //姓名
                    stuname: "",
                    //性别
                    sex: "",
                    //名族
                    people: "",
                    //出生日期
                    birthday: "",
                    //籍贯
                    natives: "",
                    //婚否
                    marry: "",
                    //联系电话
                    tel: "",
                    //身份证
                    cardid: "",
                    //学校
                    school: "",
                    //专业
                    profession: "",
                    //备注
                    content: "",
                    //相片
                    pictureAdd: "",
                    //入职日期
                    hiredate:"",
                },
                baseData1: {
                    dname: "",
                    job: "",
                    dept_appra_name: ""
                },
                //路径
                activeIndex: "",
                //表单验证标志
                useInfoFormRules:{},

                useInfo:{
                    estimated:[
                        {required: true, message: '不能为空',  trigger: 'blur'}
                    ],
                    ability: [
                        { validator: checkAbility, trigger: 'blur' }
                    ],
                    activity:[
                        { validator: checkAbility, trigger: 'blur' }
                    ],
                    communication:[
                        { validator: checkAbility, trigger: 'blur' }
                    ],
                    moralQuality:[
                        { validator: checkAbility, trigger: 'blur' }
                    ],
                    disposition:[
                        { validator: checkAbility, trigger: 'blur' }
                    ],
                    score:[
                        { validator: checkScore, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            //查询所有信息
            getAllEmpInfo: function () {
                axios.post("/getEmpInfo", this.listQuery).then(res => {
                    //返回的是对象数组
                    this.getDept();
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                    if(res.data.data==""){
                        this.$message({
                            message: "没有您需要评价的员工",
                            type: "warning"
                        });
                    }
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
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            querys: function () {
                //设置传递到后台的页码为一
                this.page.currentPage = 1;
                this.listQuery.page = 1;
                this.getAllEmpInfo();
            },
            //查询该登录者属于哪一个部门
            getDept: function () {
                axios.post("/getOneDept", this.listQuery.userName).then(res => {
                    if (res.data.staus == "200") {
                        this.dept = res.data.dept
                    } else {
                        this.dept = "";
                    }
                })
            },
            //打开查询界面；查询员工分数
            selectEmpInfo:function(rowData){
                //清空表单验证提示信息
                this.clearUseRules()
                //设置取消表单验证
                this.useInfoFormRules={}
                this.form.dateid="";
                //设置为只读
                this.readonly=true;
                //清空表单
                this.form = {};
                //清空学生id
                this.form.stuid="";
                //设置表单名字
                this.FormTitle = "查询"+rowData.stuname + "的成绩"
                //获取员工个人的详细信息
                axios.post("/getEmpInfoById", rowData.stuid).then(res => {
                    this.baseData = res.data
                });
                //获取评价人
                axios.get("/getEmpDeptInfoById/"+rowData.stuid +"/"+this.listQuery.userName).then(res => {
                    this.baseData1 = res.data
                })
                //加载学生id
                this.form.stuid = rowData.stuid;
                sessionStorage.setItem("stuid",rowData.stuid)
              if(rowData.score0 ==null ||rowData.score0==0){
                this.$message({
                  message: '员工目前还有没有参与过评分，成绩为空,不支持查看',
                  type: 'warning'
                });
                //this.dialogFormVisible = true
                //this.dialogFormVisible = false
                return
              }


                //解开所有选项开禁用
                this.disnoabledfun()
                this.getScore(0)
                //默认未第一个
                this.activeIndex ="1";
                this.dialogFormVisible = true

            }, //从后台获取分数信息
            getScore:function(timeid){
                this.openform()
                axios.get("/selectEmpScore/"+this.form.stuid+"/"+timeid).then(res => {
                    this.form = res.data
                    // this.form.moralQuality=res.data.moral_quality
                    // if(timeid==0){
                    //     this.form.score =res.data.score0
                    //     this.form.estimated=res.data.estimatedfirst
                    // }
                    // if(timeid==1){
                    //     this.form.score =res.data.score1
                    //     this.form.estimated=res.data.estimatedone
                    // }
                    // if(timeid==2){
                    //     this.form.score =res.data.score2
                    //     this.form.estimated=res.data.estimatedtwo
                    // }
                    // if(timeid==3){
                    //     this.form.score =res.data.score3
                    //     this.form.estimated=res.data.estimatedthird
                    // }
                })
            },
            //打开修改界面
            revise:function(rowData){
                //代表是修改界面
                this.updateEmpScore=true
                //加载表单验证
                this.useInfoFormRules=this.useInfo
                //清空表单验证提示信息
                this.clearUseRules()

                //设置为只读
                this.readonly=false;
                //清空表单
                this.form = {};
                //清空学生id
                this.form.stuid="";
                this.form.dateid="";
                //this.form.dateid=0;
                //所有选项禁用
                this.disabledfun();
                //打开保存选项的非禁用
                this.disabled5=false
                this.form.dateid=0;
                sessionStorage.setItem("dateid",this.form.dateid)
                //设置表单名字
                this.FormTitle = "修改"+rowData.stuname + "的成绩"
                //获取员工个人的详细信息
                axios.post("/getEmpInfoById", rowData.stuid).then(res => {
                    this.baseData = res.data
                });
                //获取评价人
                axios.get("/getEmpDeptInfoById/"+rowData.stuid +"/"+this.listQuery.userName).then(res => {
                    this.baseData1 = res.data
                })
                //加载学生id
                this.form.stuid = rowData.stuid;
                sessionStorage.setItem("stuid",rowData.stuid)
                //默认第一个
                //判断分数情况，如果没有分数的选项卡直接禁用
                //以总评为标志，总评有则直接可以修改，否则禁用
                //初始时，做出查询，根据总表的数据情况进行判断
                //是否再次在后台查询总表数据（？），该表没有地方可以修改，故比在查询
                //如果没有转正评分，查询设置禁用或者提示
                if(rowData.score0 == 0 || rowData.score0 == null){
                    this.$message({
                        message: '员工目前还有没有参与过评分，成绩为空',
                        type: 'warning'
                    });
                    //this.dialogFormVisible = false
                    return
                    //只有转正成绩
                }else if(rowData.score1 == 0 || rowData.score1 == null){
                    this.disabled1=false;
                  //有一年成绩
                }else if(rowData.score2 == 0 || rowData.score2 == null){
                    this.disabled1=false;
                    this.disabled2=false;
                    //有两年成绩
                }else if(rowData.score3 == 0 || rowData.score3 == null){
                    this.disabled1=false;
                    this.disabled2=false;
                    this.disabled3=false;
                    //有三年成绩
                }else {
                    this.disnoabledfun()
                    this.disabled5=false
                }
                this.getScore(0)
                this.activeIndex ="1";
                this.dialogFormVisible = true
            },


            //打开评分页面
            setMark: function (rowData) {
                //代表是打分操作
                this.updateEmpScore =false
                //加载表单验证
                this.useInfoFormRules=this.useInfo
                this.form.dateid="";
                //清除错误提示
                this.clearUseRules()
                //解开只读
                this.readonly=false;
                //清空表单
                this.form = {};
                //清空学生信息
                this.form.stuid="";
                //设置所有选项禁用
                this.disabledfun();
                //设置表格数据为空
                this.baseData={}
                //表单名字
                this.FormTitle = rowData.stuname + "的成绩"
                //获取员工个人的详细信息
                axios.post("/getEmpInfoById", rowData.stuid).then(res => {
                    this.baseData = res.data;
                });
                //获取评价人
                axios.get("/getEmpDeptInfoById/"+rowData.stuid +"/"+this.listQuery.userName).then(res => {
                    this.baseData1 = res.data
                });
                this.form.stuid = rowData.stuid;
                sessionStorage.setItem("stuid",rowData.stuid);
                //查询成绩(判断是否需要评分)
                //添加一个判断，事件间隔大于三个月才可以进行评分
                //使用了上一次查出来的时间
                this.curtime = new Date();
                var empdate = new Date(rowData.hiredate);
                this.num = (this.curtime - empdate)/(1000*3600*24);//天数，一天算一年
                //根据该数值对能评价的人的地方进行释放，自动释放
                if (rowData.score0 == 0 || rowData.score0 == null) {
                    if(this.num > 90){
                        this.disabled1 = false;
                        this.form.dateid = 0;
                        this.activeIndex = "1";
                    }else{
                        this.$message({
                            message: '还没有到达评价日期，无法评价',
                            type: 'warning'
                        });
                        //alert("还没有到达转正日期，无法评价")
                        return
                    }
                } else {
                    if (rowData.score1 == 0 || rowData.score1 == null) {
                        if(this.num > 365){
                            this.disabled2 = false
                            this.form.dateid = 1;
                            this.activeIndex = "2";
                        }else{
                            this.$message({
                                message: '还没有到达评价日期，无法评价',
                                type: 'warning'
                            });
                            return
                        }
                    } else {
                        if (rowData.score2 == 0 || rowData.score2 == null) {
                            if(this.num > 730){
                                this.disabled3 = false
                                this.form.dateid = 2;
                                this.activeIndex = "3";
                            }else{
                                this.$message({
                                    message: '还没有到达评价日期，无法评价',
                                    type: 'warning'
                                });
                                return
                            }
                        } else {
                            if (rowData.score3 == 0 || rowData.score3 == null) {
                                if(this.num > 1095){
                                    this.disabled4 = false
                                    this.form.dateid = 3;
                                    this.activeIndex = "4";
                                }else{
                                    this.$message({
                                        message: '还没有到达评价日期，无法评价',
                                        type: 'warning'
                                    });
                                    return
                                }
                            }
                        }
                    }
                }
                 //message: '各位评价人请谨慎打分，一旦提交不可修改',
                this.$confirm('该操作为评分操作，一旦提交分数则不可以修改, 是否继续评分?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.dialogFormVisible = true
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
                //this.dialogFormVisible = true
            },
            //清空和赋值stuid
            openform:function(){
               this.form={};
               this.form.stuid =sessionStorage.getItem("stuid")
            },
            //保存数据
            updateScore: function () {
                this.$refs["empForm"].validate((valid) => {
                    if (valid) {
                        if(this.updateEmpScore){
                           //保存修改后的评分
                            //怎么给dataid 和stuid赋值
                            this.getAllEmpInfo()
                            this.form.stuid=sessionStorage.getItem("stuid")
                            this.form.dateid=sessionStorage.getItem("dateid")
                            axios.post("/updateScore",this.form).then(res =>{
                                if(res.data =="success"){
                                    this.$message({
                                        message: "修改成功",
                                        type: "success"
                                    });
                                }else{
                                    this.$message({
                                        message: "失败",
                                        type: "warning"
                                    });
                                }
                            })
                        }else {
                            //保存评分
                            axios.post("/updateScore", this.form).then(res => {
                                if (res.data == "success") {
                                    this.getAllEmpInfo()
                                    if (this.form.dateid == 0) {
                                        this.disabled1 = true;
                                        if(this.num<365){
                                            this.$message({
                                                message: "转正评价成功，一年评价还无法进行",
                                                type: "success"
                                            });
                                            this.dialogFormVisible = false
                                        }else{
                                            this.disabled2 = false;
                                            this.openform()
                                            this.form.dateid =1;
                                            this.activeIndex ="2";
                                            this.$message({
                                                message: "转正评价成功",
                                                type: "success"
                                            });
                                        }
                                    }else if (this.form.dateid == 1) {
                                        this.disabled2 = true;
                                        if(this.num<730){
                                            this.$message({
                                                message: "一年评价成功，两年评价还无法进行",
                                                type: "success"
                                            });
                                            this.dialogFormVisible = false
                                        }else{
                                            this.disabled3 = false;
                                            this.openform()
                                            this.form.dateid =2;
                                            this.activeIndex ="3";
                                            this.$message({
                                                message: "一年评价成功",
                                                type: "success"
                                            });
                                        }
                                    }else if (this.form.dateid == 2) {
                                        this.disabled3 = true;
                                        if(this.num<1095){
                                            this.$message({
                                                message: "两年评价成功，三年评价还无法进行",
                                                type: "success"
                                            });
                                            this.dialogFormVisible = false
                                        }else{
                                            this.disabled4 = false;
                                            this.openform()
                                            this.form.dateid =3;
                                            this.activeIndex ="4";
                                            this.$message({
                                                message: "两年评价成功",
                                                type: "success"
                                            });
                                        }

                                    }else if (this.form.dateid == 3) {
                                        this.disabled4 = true;
                                        this.form={}
                                        this.dialogFormVisible = false
                                        this.$message({
                                            message: "三年评价成功",
                                            type: "success"
                                        });
                                    }
                                } else {
                                    this.form = {}
                                    //this.form.stuid =sessionStorage.getItem("stuid");
                                    this.$message({
                                        message: "失败",
                                        type: "warning"
                                    });
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            //跳转到转正评价（也是默认的界面）
            toMark1:function(){
                this.openform()
                this.form.dateid =0;
                sessionStorage.setItem("dateid",this.form.dateid)
                this.getScore(0)
                this.activeIndex ="1";
            },
            //跳转到一年评价
            toMark2:function(){
                this.openform()
                this.form.dateid =1;
                sessionStorage.setItem("dateid",this.form.dateid)
                this.getScore(1)
                this.activeIndex ="2";

            },
            //跳转到两年评价
            toMark3:function(){
                this.openform()
                this.form.dateid =2;
                sessionStorage.setItem("dateid",this.form.dateid)
                this.getScore(2)
                this.activeIndex ="3";

            },
            //跳转到三年评价
            toMark4:function(){
                this.openform()
                this.form.dateid =3;
                sessionStorage.setItem("dateid",this.form.dateid)
                this.getScore(3)
                this.activeIndex ="4";
            },
            //默认所有按钮禁用
            disabledfun:function(){
                this.disabled1= true;
                this.disabled2= true;
                this.disabled3= true;
                this.disabled4= true;
                this.disabled5= false;
            },
            //默认所有按钮开启
            disnoabledfun:function(){
                this.disabled1=false
                this.disabled2=false;
                this.disabled3=false;
                this.disabled4= false;
                this.disabled5= true;
            },
            //获取当前时间
            getdatatime(){//默认显示今天
                this.curtime= new Date();
                var year=this.curtime.getFullYear();
                var month= this.curtime.getMonth()+1<10 ? "0"+(this.curtime.getMonth()+1) : this.curtime.getMonth()+1;
                var day=this.curtime.getDate()<10 ? "0"+this.curtime.getDate() : this.curtime.getDate();
                return year+"-"+month+"-"+day;
            },
            //清空表单提示语句
            clearUseRules:function () {
                this.$nextTick(() => {
                    this.$refs["empForm"].clearValidate()
                })
            },

            //关闭页面
            closeDlog: function () {
                this.getAllEmpInfo()
               // this.$refs[empForm].resetFields();
                //清空数据
                this.form = {};
                this.clearUseRules()
                //关闭对话框
                this.dialogFormVisible = false
                //this.$refs[empForm].resetFields();
            },
        },
        mounted() {
            //获取数据
            this.listQuery.userName = sessionStorage.getItem("userName")
            this.getDept()
            this.getAllEmpInfo()
            //this.from.stuid =sessionStorage.getItem("stuid");
            this.getdatatime()
        }
    }
</script>

<style scoped>
  #table1 {
    text-align: center;
    border-collapse: collapse;
    height: 140px;
    width: 100%;

  }

  table {
    text-align: center;
    border-collapse: collapse;
    width: 100%;
    height: 120px;
  }

  input {
    border: 0;
    width: 65px;
    height: 34px;
    text-align: center;
    border: white;
  }
  el-input {
    border: 0;
    width: 65px;
    height: 34px;
    text-align: center;
    border: white;
  }
  .paperview-input-text >>> .el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    /*padding: 1%;*/
    text-align: center;

    border: 0px;
    width: 70px;
    height:30px;
  }
  .paperview-input-textarea >>> .el-textarea__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    outline: none;
    border: 0px;
    width: 100%;
  }
  .el-footer {
    background-image: linear-gradient(to bottom, #547BD8 , #BDC8FF);
  }



</style>
