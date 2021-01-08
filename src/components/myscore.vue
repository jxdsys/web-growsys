<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="学校评价" name="first">
      <table border="1" style="border: 1px solid" cellpadding="0" cellspacing="0">
        <tr>
          <td rowspan="2">培训学校</td>
          <td rowspan="2">班期</td>
          <td rowspan="2">评价人</td>
          <td colspan="6">培训期间成绩</td>
          <td rowspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td>html笔试</td>
          <td>oracle成绩</td>
          <td>js成绩</td>
          <td>java基础</td>
          <td>java高级</td>
          <td>L1面试</td>
        </tr>
        <tr>
          <td>学习评价</td>
          <td>{{this.schoolAppra.term_id}}</td>
          <td>{{this.schoolAppra.sch_appra_name}}</td>
          <td>{{this.schoolAppra.html}}</td>
          <td>{{this.schoolAppra.oracle}}</td>
          <td>{{this.schoolAppra.js}}</td>
          <td>{{this.schoolAppra.java}}</td>
          <td>{{this.schoolAppra.superjava}}</td>
          <td>{{this.schoolAppra.l1}}</td>
          <td>

              <el-rate v-if="schoolAppra.apprascore > 0"
                       v-model="schoolAppra.apprascore"
                       disabled
                       text-color="#101010"
                       :colors="scoreColors"
              >
              </el-rate>
              <el-rate v-else
                       v-model="schoolAppra.apprascore"
                       disabled
                       show-score
                       text-color="#101010"
                       score-template="暂无评分"
                       :colors="scoreColors"
              >
              </el-rate>
          </td>
        </tr>
        <tr>
          <td>评价(优点缺点)</td>
          <td colspan="9">
            {{this.schoolAppra.content}}
          </td>
        </tr>
      </table>
    </el-tab-pane>
    <el-tab-pane label="转正评价" name="second">
      <table border="1" style="border: 1px solid" cellpadding="0" cellspacing="0">
        <tr>
          <td rowspan="2">项目</td>
          <td rowspan="2">员工部门</td>
          <td rowspan="2">员工职务</td>
          <td rowspan="2">评价人</td>
          <td colspan="5">评价分项</td>
          <td rowspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td>能力</td><td>积极性</td><td>沟通交流</td><td>人品</td><td>性格</td>
        </tr>
        <tr><td>工作评分</td>
          <td>{{this.deptAndEmpAppra.dname}}</td>
          <td>{{this.deptAndEmpAppra.job}}</td>
          <td>{{this.deptAndEmpAppra.dept_appra_name}}</td>
          <td>{{this.deptAndEmpAppra.ability}}</td>
          <td>{{this.deptAndEmpAppra.activity}}</td>
          <td>{{this.deptAndEmpAppra.communication}}</td>
          <td>{{this.deptAndEmpAppra.moral_quality}}</td>
          <td>{{this.deptAndEmpAppra.disposition}}</td>
          <td>
            <el-rate v-if="deptAndEmpAppra.score0 > 0"
                     v-model="deptAndEmpAppra.score0"
                     disabled
                     text-color="#101010"
                     :colors="scoreColors"
            >
            </el-rate>
            <el-rate v-else
                     v-model="deptAndEmpAppra.score0"
                     disabled
                     show-score
                     text-color="#101010"
                     score-template="暂无评分"
                     :colors="scoreColors"
            >
            </el-rate>
          </td>
        </tr>
        <tr>
          <td >评价(优点缺点)</td>
          <td colspan="9">
            {{this.deptAndEmpAppra.estimatedfirst}}
          </td>
        </tr>

      </table>
    </el-tab-pane>
    <el-tab-pane label="一年评价" name="third">
      <table border="1" style="border: 1px solid" cellpadding="0" cellspacing="0">
        <tr>
          <td rowspan="2">项目</td>
          <td rowspan="2">员工部门</td>
          <td rowspan="2">员工职务</td>
          <td rowspan="2">评价人</td>
          <td colspan="5">评价分项</td>
          <td rowspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td>能力</td><td>积极性</td><td>沟通交流</td><td>人品</td><td>性格</td>
        </tr>
        <tr><td>工作评分</td>
          <td>{{this.deptAppraToOne.dname}}</td>
          <td>{{this.deptAppraToOne.job}}</td>
          <td>{{this.deptAppraToOne.dept_appra_name}}</td>
          <td>{{this.deptAppraToOne.ability}}</td>
          <td>{{this.deptAppraToOne.activity}}</td>
          <td>{{this.deptAppraToOne.communication}}</td>
          <td>{{this.deptAppraToOne.moral_quality}}</td>
          <td>{{this.deptAppraToOne.disposition}}</td>
          <td>
            <el-rate v-if="deptAppraToOne.score1 > 0"
                     v-model="deptAppraToOne.score1"
                     disabled
                     text-color="#101010"
                     :colors="scoreColors"
            >
            </el-rate>
            <el-rate v-else
                     v-model="deptAppraToOne.score1"
                     disabled
                     show-score
                     text-color="#101010"
                     score-template="暂无评分"
                     :colors="scoreColors"
            >
            </el-rate>
          </td>
        </tr>
        <tr>
          <td >评价(优点缺点)</td>
          <td colspan="9">
            {{this.deptAppraToOne.estimatedone}}
          </td>
        </tr>

      </table>
    </el-tab-pane>
    <el-tab-pane label="两年评价" name="fourth">
      <table border="1" style="border: 1px solid" cellpadding="0" cellspacing="0">
        <tr>
          <td rowspan="2">项目</td>
          <td rowspan="2">员工部门</td>
          <td rowspan="2">员工职务</td>
          <td rowspan="2">评价人</td>
          <td colspan="5">评价分项</td>
          <td rowspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td>能力</td><td>积极性</td><td>沟通交流</td><td>人品</td><td>性格</td>
        </tr>
        <tr><td>工作评分</td>
          <td>{{this.deptAppraToTwo.dname}}</td>
          <td>{{this.deptAppraToTwo.job}}</td>
          <td>{{this.deptAppraToTwo.dept_appra_name}}</td>
          <td>{{this.deptAppraToTwo.ability}}</td>
          <td>{{this.deptAppraToTwo.activity}}</td>
          <td>{{this.deptAppraToTwo.communication}}</td>
          <td>{{this.deptAppraToTwo.moral_quality}}</td>
          <td>{{this.deptAppraToTwo.disposition}}</td>
          <td>
            <el-rate v-if="deptAppraToTwo.score2 > 0"
                     v-model="deptAppraToTwo.score2"
                     disabled
                     text-color="#101010"
                     :colors="scoreColors"
            >
            </el-rate>
            <el-rate v-else
                     v-model="deptAppraToTwo.score2"
                     disabled
                     show-score
                     text-color="#101010"
                     score-template="暂无评分"
                     :colors="scoreColors"
            >
            </el-rate>
          </td>
        </tr>
        <tr>
          <td >评价(优点缺点)</td>
          <td colspan="9">
            {{this.deptAppraToTwo.estimatedtwo}}
          </td>
        </tr>

      </table>
    </el-tab-pane>
    <el-tab-pane label="三年评价" name="fifth">
      <table border="1" style="border: 1px solid" cellpadding="0" cellspacing="0">
        <tr>
          <td rowspan="2">项目</td>
          <td rowspan="2">员工部门</td>
          <td rowspan="2">员工职务</td>
          <td rowspan="2">评价人</td>
          <td colspan="5">评价分项</td>
          <td rowspan="2">整体评价分数</td>
        </tr>
        <tr>
          <td>能力</td><td>积极性</td><td>沟通交流</td><td>人品</td><td>性格</td>
        </tr>
        <tr><td>工作评分</td>
          <td>{{this.deptAppraToThree.dname}}</td>
          <td>{{this.deptAppraToThree.job}}</td>
          <td>{{this.deptAppraToThree.dept_appra_name}}</td>
          <td>{{this.deptAppraToThree.ability}}</td>
          <td>{{this.deptAppraToThree.activity}}</td>
          <td>{{this.deptAppraToThree.communication}}</td>
          <td>{{this.deptAppraToThree.moral_quality}}</td>
          <td>{{this.deptAppraToThree.disposition}}</td>
          <td>
            <el-rate v-if="deptAppraToThree.score3 > 0"
                     v-model="deptAppraToThree.score3"
                     disabled
                     text-color="#101010"
                     :colors="scoreColors"
            >
            </el-rate>
            <el-rate v-else
                     v-model="deptAppraToThree.score3"
                     disabled
                     show-score
                     text-color="#101010"
                     score-template="暂无评分"
                     :colors="scoreColors"
            >
            </el-rate>
          </td>
        </tr>
        <tr>
          <td >评价(优点缺点)</td>
          <td colspan="9">
            {{this.deptAppraToThree.estimatedthird}}
          </td>
        </tr>

      </table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        userName:'',
        value2: null,
        scoreColors: ['#97A5BF', '#F7BA2A', '#FF9900'],   // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
        texts:['极差','差','一般','良好','优秀'],
        activeName: 'second',
        schoolAppra:[],
        deptAndEmpAppra:[],
        deptAppraToOne:[],
        deptAppraToTwo:[],
        deptAppraToThree:[],
        apprascore:3.2
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      GetAllAppra(){
        axios.post("GetAllAppra",this.userName).then(res =>{
          if (res.data.count = "200") {
            this.schoolAppra = res.data.schoolData;
            this.deptAndEmpAppra= res.data.threeMonthData;
            this.deptAppraToOne = res.data.oneYearData;
            this.deptAppraToTwo = res.data.twoYearData;
            this.deptAppraToThree = res.data.threeYearData;
          }else {
            this.$message({
              message: "获取学生成绩失败",
              type: "error"
            })
          }
        })
      }

    },
    mounted() {
      this.userName = sessionStorage.getItem("userName")
      this.GetAllAppra();
    }
  };
</script>
