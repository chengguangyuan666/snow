<template>
  <div>
    <div><template>
      <Tabs v-on:on-click="click">
        <TabPane name="1" label="办事指南"></TabPane>
        <TabPane name="2" label="申报"></TabPane>
        <TabPane name="3" label="待提报"></TabPane>
        <TabPane name="5" label="审核中"></TabPane>
        <TabPane name="6" label="已办结"></TabPane>
        <TabPane name="4" label="已驳回"></TabPane>
      </Tabs>
    </template>
      <div>
        <Content>
          <div v-if="show == 2" style="    padding-left: 8px; padding-right: 8px;  padding-top: 10px;  background: rgb(242, 245, 248);">
            <div style="overflow: scroll;height: 80vh;padding: 8px; border: 1px solid rgb(237, 239, 241); background: white;">
              <scpcw-base-load-component scp-type="引用模版" :path="path" :scp-show="true"></scpcw-base-load-component>
            </div>
          </div>
          <div v-if="show == 3">
            <div class="fdsd">
              <i-form :model="formline" :inline="true" scp-type="搜索条" style="border-width:1px;padding:8px 48px 8px 16px;">
                <wl-iview-form-item scp-allowparent="i-form" style="padding:2px;margin-bottom:0px;">
                  <div style="padding:1px;min-width:40px;" scp-layout="true">
                    <DatePicker style="width: 200px" placeholder="开始时间" type="date" v-model="formline.aa"></DatePicker>
                    <DatePicker style="width: 200px;margin-left: 5px" placeholder="结束时间" type="date" v-model="formline.bb"></DatePicker>
                  </div>
                </wl-iview-form-item>
                <wl-iview-form-item scp-allowparent="i-form" style="padding:2px;margin-bottom:0px;">
                  <div style="padding:1px;min-width:40px;" scp-layout="true">
                    <i-button v-on:click="search()" icon="ios-search" scp-type="按钮" style="" type="primary">搜索</i-button>
                  </div>
                </wl-iview-form-item>
              </i-form>
              <vxe-toolbar :custom="true" style="padding-right: 22px;position: absolute; top: 1px; right: 1px;"></vxe-toolbar>
              <div style="padding-left: 8px;                          padding-right: 8px;                          padding-top: 10px;                           background: #F2F5F8; ">
                <div style="padding: 8px; border: 1px solid #EDEFF1; background: white; height: 710px;">
                  <vxe-table :border="true" :data="dataTable.results" :custom-config="{storage: true}" scp-type="vxe表格" :stripe="true" style="margin-top:20px;" :highlight-hover-row="true" align="center" show-overflow="tooltip">
                    <vxe-table-column width="80" type="index" title="序号"></vxe-table-column>
                    <vxe-table-column field="flowName" title="事项名称" min-width="110"></vxe-table-column>
                    <vxe-table-column v-if="currentClick != 3" field="" width="100" title="流程"><template style="margin:1px;padding:1px;min-height:20px;" scp-layout="true" v-slot="{ row }"><span v-on:click="lcjd(row)" :id="row.process_instance_key" style="color: #2d8cf0;cursor: pointer;">查看</span></template></vxe-table-column>
                    <vxe-table-column field="create_date" title="创建时间"></vxe-table-column>
                    <vxe-table-column field="create_by" title="提报人"></vxe-table-column>
                    <vxe-table-column field="status" width="100" title="状态"><template scp-layout="true" v-slot="{ row }"><span v-if="row.status==='0'">待提报</span><span v-if="row.status==='1'">审核中</span><span v-if="row.status==='2'">已办结</span><span v-if="row.status==='3'">已驳回</span></template></vxe-table-column>
                    <vxe-table-column :title="item.title" v-for="(item,index) in columns" :field="item.col" :visible="false" :key="index"></vxe-table-column>
                    <vxe-table-column field="" width="400" fixed="right" style="" title="操作"><template style="margin:1px;padding:1px;min-height:20px;" scp-layout="true" v-slot="{ row }">
                      <i-button v-if="(currentClick == 3|currentClick ==4)" v-on:click="krAction('submit',row)" size="small" :loading="isBtnLoading" type="success" class="local-btn-1">提报</i-button>
                      <i-button v-if="currentClick != 3" v-on:click="krAction('look',row)" size="small" :loading="isBtnLoading" type="success" class="local-btn-1">详情</i-button>
                      <i-button v-if="(currentClick == 3|currentClick ==4)" v-on:click="krAction('edit',row)" size="small" style="margin-left:5px;" type="info" class="local-btn-2">编辑</i-button>
                      <i-button v-if="(currentClick == 3|currentClick ==4)" v-on:click="krAction('del',row)" size="small" style="margin-left:5px" type="error" class="local-btn-3">删除</i-button>
                      <i-button v-if="currentClick != 3" v-on:click="appoveInfo(row)" size="small" :id="row.process_instance_key" style="margin-left:5px;" type="primary" class="local-btn-4">审批履历</i-button><span v-if="currentClick == 6">
                                                    <i-button v-if="row.fileUrl" v-on:click="result(row)" size="small" :id="row.process_instance_key" style="margin-left:5px;" type="primary" class="local-btn-5  resultCss">结果物</i-button>
                                                </span>
                    </template></vxe-table-column>
                  </vxe-table>
                  <Page :current="pageObj.pageNo" :page-size="pageObj.pageSize" :total="pageObj.totalRecord" v-on:on-change="pageChange" scp-type="分页" style="margin-top: 20px;                     margin-bottom: 20px;                     text-align: center;" :show-total="true" v-on:on-page-size-change="pageSizeChange"></Page>
                </div>

              </div>
              <Modal ok-text="确认删除" title="确认删除" v-model="delModal" v-on:on-ok="krAction('tdel')">
                <div style="text-align:center;font-size:14px">
                  被删除的数据无法恢复，是否确认删除？
                </div>
              </Modal>
              <Modal width="60%" style="display: flex" title="结果物" :footer-hide="true" v-model="lcjdmod1">
                <Row justify="center" :gutter="1" scp-type="三格" style="padding:5px;" type="flex">
                  <Table :border="true" :data="data1" :stripe="true" :highlight-hover-row="true" :columns="columns1"><template slot-scope="{ row }" slot="action">
                    <i-button v-on:click="download(row)" size="small" style="margin-right: 5px" type="primary">下载</i-button>
                  </template></Table>
                </Row>
              </Modal>
              <Modal ok-text="确认提报" title="确认提报" v-model="confirmModal" v-on:on-ok="krAction('sure')">
                <div style="text-align:center;font-size:14px">
                  您是否确认提报？
                </div>
              </Modal>
              <Modal width="85%" style="display: flex;" title="流程图" :footer-hide="true" v-model="lcjdmod">
                <Row justify="center" :gutter="1" scp-type="三格" style="padding:5px 0;" type="flex">
                  <div style="width: 100%"><img :src="imgsrc" style="margin-left:10px"> </img></div>
                </Row>
              </Modal>
              <Modal width="100%" style="display: flex" :footer-hide="true" v-model="appoveinfo">
                <Row justify="center" :gutter="1" scp-type="三格" style="padding:5px;" type="flex">
                  <vxe-table :data="page.results" scp-type="vxe表格" :stripe="true" style="margin-top:20px;width:100%;" :highlight-hover-row="true" align="center" show-overflow="tooltip">
                    <vxe-table-column width="120" type="index" title="序号"></vxe-table-column>
                    <vxe-table-column style="" title="审批人" min-width="300"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span style="">{{row.createby}}</span></template></vxe-table-column>
                    <vxe-table-column title="状态" min-width="300"><template style="margin:1px;padding:1px;min-height:20px;" scp-layout="true" v-slot="{ row }"><span>{{row.status==1?'通过':'驳回'}}</span></template></vxe-table-column>
                    <vxe-table-column title="创建时间" min-width="300"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span style="">{{row.createtime}}</span></template></vxe-table-column>
                    <vxe-table-column title="内容" min-width="400"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span style="">{{row.remark}}</span></template></vxe-table-column>
                  </vxe-table>
                  <Page :current="page.pageNo" :page-size="page.pageSize" :total="page.totalRecord" v-on:on-change="changeModel(val)" scp-type="分页" style="margin-top:20px;" :show-elevator="true" v-on:on-page-size-change="pagechangeModel(val)"></Page>
                </Row>
              </Modal>
            </div>
          </div>
          <div v-if="show == 1" class="container1">
            <div class="layout-tabs">
              <div :class="{ 'layout-tab-select': tab == 11 }" v-on:click="clickTab(0, 11)" class="layout-tab">基本信息</div>
              <div :class="{ 'layout-tab-select': tab == 12 }" v-on:click="clickTab('#link2', 12)" class="layout-tab">申请条件</div>
              <div :class="{ 'layout-tab-select': tab == 13 }" v-on:click="clickTab('#link3', 13)" class="layout-tab">申请规则</div>
              <div :class="{ 'layout-tab-select': tab == 14 }" v-on:click="clickTab('#link4', 14)" class="layout-tab">办理环节</div>
              <div :class="{ 'layout-tab-select': tab == 15 }" v-on:click="clickTab('#link5', 15)" class="layout-tab">特殊环节</div>
              <div :class="{ 'layout-tab-select': tab == 16 }" v-on:click="clickTab('#link6', 16)" class="layout-tab">办件公示</div>
            </div>
            <div id="container1-area-id" class="container1-area">
              <div class="container1-card">
                <Tabs type="card">
                  <TabPane label="基本信息">
                    <Row :class="{'base-card-first':index == 0, 'base-card-last':index == info.length - 1}" v-for="(item, index) in info" class="base-card" :key="index">
                      <Col class="base-card-text base-card-text-background" span="3">{{item[0].key}}</Col>
                      <Col v-if="item[1]" class="base-card-text" span="9">{{item[0].value}}</Col>
                      <Col v-if="item[1] ==undefined" class="base-card-text" span="21">{{item[0].value}}</Col>
                      <Col v-if="item[1]" class="base-card-text base-card-text-background" span="3">{{item[1].key}}</Col>
                      <Col v-if="item[1]" class="base-card-text base-card-text-last" span="9">{{item[1].value}}</Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </div>
              <div id="link2" class="container1-card">
                <Tabs type="card">
                  <TabPane v-for="(item,index) in tjlist" label="申请条件" :key="'tj'+index">
                    {{item[0].value}}
                  </TabPane>
                </Tabs>
              </div>
              <div id="link3" class="container1-card">
                <Tabs type="card">
                  <TabPane v-for="(item,index) in gzlist" label="申请规则" :key="'gz'+index">
                    <div>{{item[0].value}}</div>
                  </TabPane>
                </Tabs>
              </div>
              <div id="link4" class="container1-card">
                <Tabs type="card">
                  <TabPane label="办理环节">
                    <Table :border="true" size="small" :data="handleListContent" :columns="handleListTitle"></Table>
                  </TabPane>
                </Tabs>
              </div>
              <div id="link5" class="container1-card">
                <Tabs type="card">
                  <TabPane label="特殊环节">
                    <Table :border="true" size="small" :data="specialLinkcontent" :columns="specialLinkTitle"></Table>
                  </TabPane>
                </Tabs>
              </div>
              <div id="link6" class="container1-card">
                <Tabs type="card">
                  <TabPane label="办件公示">
                    <Table :border="true" size="small" :data="publicitycontent" :columns="publicityTitle"></Table>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </Content>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      type: 0,
      formlineT: {},
      path: '',
      tab: 11,
      process_name: '',
      isedit2: false,
      curr: [],
      imgsrc: {},
      lcjdmodT: false,
      rejectedNum: 0,
      isBtnLoading: false,
      info: [],
      reject_num: '',
      columns1: [{
        width: '430',
        title: '名称',
        align: 'center',
        key: 'name'
      }, {
        slot: 'action',
        title: '操作',
        align: 'center',
        'min-width': '250'
      }],
      reportedNum: 0,
      row2: {},
      completedNum: 0,
      dataTableT: {},
      name: '',
      appoveinfoT: false,
      page: {
        pageNo: 0,
        pageSize: 0,
        totalRecord: 0
      },
      gzlist: [],
      handleListTitle: [{
        title: '环节名称',
        key: 'handling_name'
      }, {
        title: '环节时限（工作日）',
        key: 'handling_time_limit'
      }],
      currentShow: false,
      publicityTitle: [{
        title: '公示标题',
        key: 'public_title'
      }, {
        title: '公示字段',
        key: 'public_params'
      }, {
        title: '公示具体内容',
        key: 'public_content'
      }],
      columns: [],
      breadObj: {
        1: '办事指南',
        2: '申报',
        3: '待提报',
        4: '已驳回',
        5: '审核中',
        6: '已办结'
      },
      show: '2',
      confirmModal: false,
      delModalT: false,
      specialLinkcontent: [],
      processKey: '',
      pageObjT: {
        pageNo: 1,
        pageSize: 10,
        totalRecord: 0
      },
      row: {},
      vall: 10,
      kr_cp: {},
      flowId: '',
      bread: '办事指南',
      lcjdmod: false,
      delModal: false,
      data1: [],
      reviewNum: 0,
      confirmModalT: false,
      tjlist: [],
      publicitycontent: [],
      currentClick: 1,
      pageObj: {
        pageNo: 1,
        pageSize: 10,
        totalRecord: 0
      },
      pageT: {
        pageNo: 0,
        pageSize: 0,
        totalRecord: 0
      },
      appoveinfo: false,
      specialLinkTitle: [{
        title: '环节名称',
        key: 'link_name'
      }, {
        title: '特殊环节名称',
        key: 'special_name'
      }, {
        title: '特殊环节发起规则',
        key: 'special_initiation_rules'
      }, {
        title: '特殊环节结果物',
        key: 'special_outcome'
      }],
      dataTable: {},
      handleListContent: [],
      imgsrcT: {},
      lcjdmod1: false,
      formline: {}
    }
  },
  computed: {},
  watch: {},
  created () {},
  beforeMount () {},
  mounted () {
    // this.$wlUtils.setJustLoginUrl('http://bizsubmitportal.tripln.com/#/login?a=')
    console.log(this.$route.params, 'this.$route.param给老子出来')
    this.flowId = this.$route.params.flowId
    this.processKey = this.$route.params.processKey
    this.type = this.$route.params.Type
    // 测试用
    // this.flowId = '2a2d733aeeb7429794f49b403180fb76'
    // this.statistics()
    this.colt()
    this.initFirst()
    this.obtainName()
    // 办事指南
    this.initGuide()
    // 办件公示
    this.handlingPublicity()
  },
  destroyed () {},
  methods: {
    clickTitle () {
      window.location.href = this.$route.matched[0].meta.headerTextStyle.url
    },
    appoveInfo (row) {
      console.log(row, '审批履历')
      this.$scp.post('/api/ac/bizpublic/transferService/approval', {
        process_instanceId: row.process_instance_key
      }, this.page)
      this.appoveinfo = true
    },
    lcjd (row) {
      console.log(row, 'rowQQQQ')
      this.imgsrc = 'http://bizplatform.qstb.top/api/ac/bizplatform/flowDiagramService/image?processInstanceId=' + row.process_instance_key
      if (document.domain.indexOf('tripln') == -1) {
        this.imgsrc = this.imgsrc.replace(/bizplatform.qstb.top/, '10.35.33.62:33015')
      }
      console.log(this.imgsrc, ' this.imgsrc')
      this.lcjdmod = true
    },
    pageSizeChange (val) {
      this.vall = val
      if (this.formline.aa || this.formline.bb) {
        this.formline.aa = this.$common.xeUtils.toDateString(this.formline.aa, 'yyyy-MM-dd')
        this.formline.bb = this.$common.xeUtils.toDateString(this.formline.bb, 'yyyy-MM-dd')
      } else {
        this.formline.aa = ''
        this.formline.bb = ''
      }
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/selectFlow',
        data: {
          status: 0,
          power_type: this.type,
          processKey: this.processKey,
          flowId: this.flowId,
          flowName: this.formline.flowName,
          aa: this.formline.aa,
          bb: this.formline.bb,
          pageNo: this.curr,
          pageSize: val
        },
        type: 'post'
      }).then(ret => {
        if (ret.data.errcode === 0) {
          this.dataTable = ret.data.data
          this.pageObj.totalRecord = ret.data.data.totalRecord
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    },
    krAction (ac_pd, row) {
      if (ac_pd == 'submit') {
        this.delMod = row
        this.confirmModal = true
      } else if (ac_pd == 'look') {
        //                       跳转详情页面
        this.show = '2'
        this.isedit2 = true
        const query = this.$route.query
        query.a = row.id
        query.b = 'isbohui'
        query.c = 'islook'
        const location = {
          query
        }
        this.$router.push(location)
      } else if (ac_pd == 'edit') {
        if (this.currentClick == 4) {
          //                       驳回跳转修改页面
          this.show = '2'
          this.isedit2 = true
          const query = this.$route.query
          query.a = row.id
          query.b = 'isbohui'
          const location = {
            query
          }
          this.$router.push(location)
        } else {
          //                       跳转修改页面
          this.show = '2'
          this.isedit2 = true
          const query = this.$route.query
          query.a = row.id
          const location = {
            query
          }
          this.$router.push(location)
        }
      } else if (ac_pd == 'del') {
        this.delMod = row
        this.delModal = true
      } else if (ac_pd == 'tdel') {
        if (this.currentClick == 4) {
          //                   驳回删除
          this.$scp.postback('/api/ac/generalreporting/generalReporting/deleteFlow', {
            flowId: this.flowId,
            id: this.delMod.id,
            power_type: this.type,
            processKey: this.processKey,
            del_flag: '1'
          }, (data) => {
            console.log(data, '点删除按钮返回')
            if (data == 1) {
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }

            this.delModal = false
            this.queryList(4)
            this.statistics() // 调统计接口
          })
        } else {
          //                   删除
          this.$scp.postback('/api/ac/generalreporting/generalReporting/deleteFlow', {
            flowId: this.flowId,
            id: this.delMod.id,
            power_type: this.type,
            processKey: this.processKey,
            del_flag: '1'
          }, (data) => {
            console.log(data, '点删除按钮返回')
            if (data == 1) {
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }

            this.delModal = false
            this.queryList(3)
            this.statistics() // 调统计接口
          })
        }
      } else if (ac_pd == 'sure') {
        if (this.currentClick == 4) {
          // 已驳回提报
          this.$wlAxios.request({
            url: '/api/ac/generalreporting/generalReporting/updateReportAgain',
            data: {
              key: this.delMod.id,
              power_type: this.type,
              processKey: this.processKey,
              flowId: this.flowId,
              status: '1'
            },
            type: 'post'
          }).then(ret => {
            if (ret.data.errcode == 0) {
              this.$Message.success('提报成功')
            } else {
              this.$Message.error(ret.data.errmsg)
            }
            this.confirmModal = false
            this.queryList(4)
          })
        } else {
          //                   提报
          this.$wlAxios.request({
            url: '/api/ac/generalreporting/generalReporting/saveApplyReportById',
            data: {
              processKey: this.processKey,
              key: this.delMod.id,
              power_type: this.type,
              flowId: this.flowId
            },
            type: 'post'
          }).then(ret => {
            console.log(ret, '点击提报返回')
            if (ret.data.errcode == 0) {
              this.$Message.success('提报成功')
            } else {
              this.$Message.error(ret.data.errmsg)
            }

            this.confirmModal = false
            this.queryList(3)
            this.statistics() // 调统计接口
          })
        }
      }
    },
    pageChange (current) {
      this.curr = current
      if (this.formline.aa || this.formline.bb) {
        this.formline.aa = this.$common.xeUtils.toDateString(this.formline.aa, 'yyyy-MM-dd')
        this.formline.bb = this.$common.xeUtils.toDateString(this.formline.bb, 'yyyy-MM-dd')
      } else {
        this.formline.aa = ''
        this.formline.bb = ''
      }

      let status
      if (this.currentClick == 3) {
        status = 0
      } else if (this.currentClick == 5) {
        status = 1
      } else if (this.currentClick == 6) {
        status = 2
      } else if (this.currentClick == 4) {
        status = 3
      }
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/selectFlow',
        data: {
          status: status,
          flowId: this.flowId,
          power_type: this.type,
          processKey: this.processKey,
          flowName: this.formline.flowName,
          aa: this.formline.aa,
          bb: this.formline.bb,
          pageNo: current,
          pageSize: this.vall
        },
        type: 'post'
      }).then(ret => {
        if (ret.data.errcode === 0) {
          this.dataTable = ret.data.data
          this.pageObj.totalRecord = ret.data.data.totalRecord
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    },
    destory () {
      const query = this.$route.query
      query.a = ''
      query.c = ''
      const location = {
        query
      }
      this.$router.push(location)
    },
    Go (val) {
      window.location.href = val
    },
    clickTab (selector, tab) {
      this.tab = tab
      // 移动距离
      let top = 0
      const dom = document.getElementById('container1-area-id')

      // 若未指定距离
      if (typeof selector === 'number') {
        top = 0
      } else {
        const anchor = document.querySelector(selector) || {
          offsetTop: 0
        }
        top = anchor.offsetTop - 190
      }

      dom.scrollTo({
        top,
        behavior: 'smooth'
      })
    },
    click (e) {
      console.log(e, '223')
      // this.$router.push({
      //     path: '/generalreporting/generalReport/DeclarationGuide'
      // })
      this.currentClick = e
      this.bread = this.breadObj[e]
      // 显示某某div
      if (e == 5 | e == 6 | e == 4) {
        this.show = 3
      } else {
        this.show = e
      }

      if (e == 3 | e == 5 | e == 6 | e == 4) {
        // 查询各个列表
        this.queryList(e)
      }

      if (this.isedit2 != true) {
        this.destory()
        console.log('qing')
      } else {
        this.isedit2 = false
      }
      this.statistics() // 调统计接口
    },
    queryList (e) {
      let status
      if (e == 3) {
        status = 0
      } else if (e == 5) {
        status = 1
      } else if (e == 6) {
        status = 2
      } else if (e == 4) {
        status = 3
      }

      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/selectFlow',
        data: {
          status: status,
          processKey: this.processKey,
          power_type: this.type,
          flowId: this.flowId
        },
        type: 'post'
      }).then(ret => {
        console.log(ret, '获取待提报列表返回值')
        if (ret.data.errcode === 0) {
          const colObj = {}
          this.columns.forEach(e => {
            if (e.dictObj) {
              colObj[e.col] = e.dictObj
            }
          }) // 构造字典对象
          this.dataTable = ret.data.data
          // this.dataTable.results.forEach (item =>{
          //     if (item.fileUrl !== undefined && this.currentClick == 6 ) {
          //         this.currentShow = true
          //     } else if (this.currentClick !== 6) {
          //         this.currentShow = false
          //     } else if(item.fileUrl === undefined && this.currentClick == 6){
          //       this.currentShow = false
          //     }
          // })
          console.log(this.dataTable.results, 'this.dataTable')
          // this.dataTable.results.forEach(item => {
          //   item.create_date = this.$common.xeUtils.toDateString(item.create_date, 'yyyy-MM-dd')
          // })
          this.pageObj.totalRecord = ret.data.data.totalRecord
          for (let i = 0; i < this.dataTable.results.length; i++) {
            const b = JSON.parse(this.dataTable.results[i].data_json)
            delete this.dataTable.results[i].data_json
            Object.keys(b).forEach(e => {
              this.dataTable.results[i][e] = b[e]
              if (colObj[e]) {
                this.dataTable.results[i][e] = colObj[e][b[e]]
              }
            })
            console.log(this.dataTable.results[i].fileUrl, 'dfdfd')
            // if(this.currentClick == 6){
            //     this.currentShow = true
            //    if(this.dataTable.results[i].fileUrl ){
            //     this.currentShow = true
            //   }else{
            //     this.currentShow = false
            //   }
            // }
            // if (this.dataTable.results[i].fileUrl !== undefined && this.currentClick == 6) {
            //     this.currentShow = true
            // } else if(this.dataTable.results[i].fileUrl === undefined && this.currentClick == 6){
            //     this.currentShow = false
            // }
            // if (this.currentClick !== 6) {
            //     this.currentShow = false
            // }
          }
          for (let j = 0; j < this.dataTable.results.length; j++) {
            console.log(this.dataTable.results[j].fileUrl, 'j')
            if (this.currentClick !== 6) {
              this.currentShow = false
            } else {
              if (this.dataTable.results[j].fileUrl) {
                this.currentShow = true
              } else {
                this.currentShow = false
              }
            }
          }
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    },
    result (row) {
      console.log(row)
      this.lcjdmod1 = true
      this.data1 = JSON.parse(row.fileUrl)
    },
    pagechangeModel (val) {
      console.log(val, 'ww')
    },
    logout () {
      // window.location.href = 'http://uia.qstb.top/api/login'
      this.$wlAxios.request({
        url: '/api/ac/sc/loginService/userLogOut',
        type: 'get'
      }).then(ret => {
        const data = ret.data
        if (data.errcode === 0) {
          window.location.href = 'http://uia.qstb.top/api/login'
        } else {
          this.$Message.error({
            content: '操作失败,\n' + data.errmsg
          })
        }
      })
    },
    search () {
      if (this.formline.aa || this.formline.bb) {
        this.formline.aa = this.$common.xeUtils.toDateString(this.formline.aa, 'yyyy-MM-dd')
        this.formline.bb = this.$common.xeUtils.toDateString(this.formline.bb, 'yyyy-MM-dd')
      } else {
        this.formline.aa = ''
        this.formline.bb = ''
      }
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/selectFlow',
        data: {
          status: 0,
          processKey: this.processKey,
          power_type: this.type,
          flowId: this.flowId,
          flowName: this.formline.flowName,
          aa: this.formline.aa,
          bb: this.formline.bb
        },
        type: 'post'
      }).then(ret => {
        if (ret.data.errcode === 0) {
          this.dataTable = ret.data.data
          this.pageObj.totalRecord = ret.data.data.totalRecord
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    },
    download (row) {
      console.log(row, 'row88')
      window.location.href = row.url
    },
    gohome () {
      console.log('++++++++++')
      console.log('gohome')
      console.log('++++++++++')
    },
    handlingPublicity () {
      const that = this
      // this.$scp.postback('http://10.40.3.156:32381/api/uc/bizplatform/flowSummaryServiceImpl/querySummaryByFlowInfoId', {
      this.$scp.postback('http://bizpublic.tripln.com/api/uc/bizpublic/bizPublicInfoService/selectPublicInfoByPage', {
        processDefinitionKey: this.processKey
      }, function (data) {
        const list = data
        list.forEach(item => {
          that.publicitycontent.push(item)
        })
      })
    },
    colt () {
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/getBizFlowNodeParamRelation',
        data: {
          processKey: this.processKey,
          flowId: this.flowId
        },
        type: 'post'
      }).then(ret => {
        if (ret.data.errcode === 0) {
          const coulmList = ret.data.data
          console.log(coulmList, 'coulmList')
          for (let i = 0; i < coulmList.length; i++) {
            const temp = {
              col: coulmList[i].name_zn,
              title: coulmList[i].name_cn
            }
            if (coulmList[i].dictType) {
              const dictObj = {}
              JSON.parse(coulmList[i].dictArr).forEach(e => {
                dictObj[e.key] = e.value
              })
              temp.dictObj = dictObj
            }

            this.columns.push(temp)
          }
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    },
    changeModel (val) {
      console.log(val, 'ee')
      // $scp.post('/api/ac/bizpublic/transferService/approval', Object.assign({}, data, { pageNo: val }), page)
    },
    initGuide () {
      const that = this
      // this.$scp.postback('http://10.40.3.156:32381/api/uc/bizplatform/flowSummaryServiceImpl/querySummaryByFlowInfoId', {
      this.$scp.postback('http://bizapprove.qstb.top/api/ac/bizsubmitportal/matterService/findSummaryByDefKey', {
        id: this.processKey
        // 测试用
        // id: '912d16beeb5611eb95810242ac110003'
      }, function (data) {
        if (data) {
          // 前端数据转换显示
          // 权利类型
          if (data.power_type) {
            if (data.power_type === '1') {
              data.power_type = '行政征收'
            }
            if (data.power_type === '2') {
              data.power_type = '行政裁决'
            }
            if (data.power_type === '3') {
              data.power_type = '行政给付'
            }
            if (data.power_type === '4') {
              data.power_type = '行政奖励'
            }
            if (data.power_type === '5') {
              data.power_type = '行政确认'
            }
            if (data.power_type === '6') {
              data.power_type = '行政许可'
            }
            if (data.power_type === '7') {
              data.power_type = '行政强制'
            }
            if (data.power_type === '8') {
              data.power_type = '行政检查'
            }
            if (data.power_type === '9') {
              data.power_type = '行政处罚'
            }
            if (data.power_type === '10') {
              data.power_type = '其他权力'
            }
          }
          // 办件类型
          if (data.ban_jian_type) {
            if (data.ban_jian_type === '1') {
              data.ban_jian_type = '即办件'
            }
            if (data.ban_jian_type === '2') {
              data.ban_jian_type = '承诺件'
            }
            if (data.ban_jian_type === '3') {
              data.ban_jian_type = '其他'
            }
          }
          // 是否支持预约
          if (data.support_reserve) {
            if (data.support_reserve === '1') {
              data.support_reserve = '是'
            }
            if (data.support_reserve === '0') {
              data.support_reserve = '否'
            }
          }
          // 是否收费
          if (data.is_shou_fei) {
            if (data.is_shou_fei === '1') {
              data.is_shou_fei = '收费'
            }
            if (data.is_shou_fei === '2') {
              data.is_shou_fei = '不收费'
            }
          }
          // 受理机构性质
          if (data.shou_li_gov_xing_zhi) {
            if (data.shou_li_gov_xing_zhi === '1') {
              data.shou_li_gov_xing_zhi = '法定机关'
            }
            if (data.shou_li_gov_xing_zhi === '2') {
              data.shou_li_gov_xing_zhi = '授权组织'
            }
            if (data.shou_li_gov_xing_zhi === '3') {
              data.shou_li_gov_xing_zhi = '受委托组织'
            }
            if (data.shou_li_gov_xing_zhi === '4') {
              data.shou_li_gov_xing_zhi = '其它'
            }
          }
          // 决定机构性质
          if (data.jue_ding_gov_xing_zhi) {
            if (data.jue_ding_gov_xing_zhi === '1') {
              data.jue_ding_gov_xing_zhi = '法定机关'
            }
            if (data.jue_ding_gov_xing_zhi === '2') {
              data.jue_ding_gov_xing_zhi = '授权组织'
            }
            if (data.jue_ding_gov_xing_zhi === '3') {
              data.jue_ding_gov_xing_zhi = '受委托组织'
            }
            if (data.jue_ding_gov_xing_zhi === '4') {
              data.jue_ding_gov_xing_zhi = '其它'
            }
          }
          const a = [
            [{
              key: '事项名称',
              value: data.title
            }, {
              key: '子项名称',
              value: data.subitem_name
            }],
            [{
              key: '主管部门',
              value: data.supervisor_department
            }, {
              key: '业务单位',
              value: data.business_unit
            }],
            [{
              key: '办理事项名称',
              value: data.ban_li_xiang_name
            }, {
              key: '事项编码',
              value: data.xing_quan_code
            }],
            [{
              key: '行政权利类型',
              value: data.power_type
            }, {
              key: '事项类型',
              value: data.item_type
            }],
            [{
              key: '办理形式',
              value: JSON.parse(data.ban_jian_xing_shi).join(',')
            }, {
              key: '办件类型',
              value: data.ban_jian_type
            }],
            [{
              key: '受理对象',
              value: JSON.parse(data.fu_wu_dui_xiang).join(',')
            }, {
              key: '重大事项决策',
              value: data.major_matter_decision
            }],
            [{
              key: '数量限制',
              value: data.num_limit
            }, {
              key: '是否支持预约',
              value: data.support_reserve
            }],
            [{
              key: '禁止性要求',
              value: data.forbid_require
            }],
            [{
              key: '办理地点',
              value: data.ban_li_address
            }],
            [{
              key: '咨询电话',
              value: data.advisory_tel
            }, {
              key: '监督电话',
              value: data.supervise_tel
            }],
            [{
              key: '是否收费',
              value: data.is_shou_fei
            }, {
              key: '收费依据',
              value: data.charge_baise
            }],
            [{
              key: '收费标准',
              value: data.charge_norm
            }, {
              key: '结果物名称',
              value: data.result_name
            }],
            [{
              key: '结果物出具外设',
              value: data.result_equipment
            }, {
              key: '结果物类型',
              value: data.result_type
            }],
            [{
              key: '结果物有效期',
              value: data.result_vaild
            }, {
              key: '结果物发放方式',
              value: data.result_deliverway
            }],
            [{
              key: '上年受理量\n\n\n ',
              value: data.lastyear_acceptance
            }, {
              key: '受理量季节性变化及原因',
              value: data.acceptance_season_change_reason
            }],
            [{
              key: '事项责任\n\n\n\n\n\n\n\n\n\n\n\n ',
              value: data.item_responsibility
            }],
            [{
              key: '权限划分',
              value: data.authority_divide
            }, {
              key: '行使层级',
              value: data.exercise_level
            }],
            [{
              key: '权力来源',
              value: data.power_source
            }],
            [{
              key: '受理机构性质',
              value: data.shou_li_gov_xing_zhi
            }, {
              key: '受理机构',
              value: data.shou_li_gov
            }],
            [{
              key: '决定机构性质',
              value: data.jue_ding_gov_xing_zhi
            }, {
              key: '决定机构',
              value: data.jue_ding_gov
            }]
          ]
          a.forEach(item => {
            that.info.push(item)
          })
          console.log('+++++a+++++')
          console.log(data)
          console.log('+++++a+++++')
          const b = [
            [{
              key: '申请条件',
              value: data.applicationc
            }]
          ]
          b.forEach(item => {
            that.tjlist.push(item)
          })
          const c = [
            [{
              key: '申请规则',
              value: data.applicationr
            }]
          ]
          c.forEach(item => {
            that.gzlist.push(item)
          })
          const d = JSON.parse(data.ban_li_huan_jie)
          d.forEach(item => {
            that.handleListContent.push(item)
          })
          const e = JSON.parse(data.te_shu_huan_jie)
          e.forEach(item => {
            that.specialLinkcontent.push(item)
          })
        } else {
          const aa = [
            [{
              key: '事项名称',
              value: '无'
            }, {
              key: '子项名称',
              value: '无'
            }],
            [{
              key: '主管部门',
              value: '无'
            }, {
              key: '业务单位',
              value: '无'
            }],
            [{
              key: '办理事项名称',
              value: '无'
            }, {
              key: '事项编码',
              value: '无'
            }],
            [{
              key: '行政权利类型',
              value: '无'
            }, {
              key: '事项类型',
              value: '无'
            }],
            [{
              key: '办理形式',
              value: '无'
            }, {
              key: '办件类型',
              value: '无'
            }],
            [{
              key: '受理对象',
              value: '无'
            }, {
              key: '重大事项决策',
              value: '无'
            }],
            [{
              key: '数量限制',
              value: '无'
            }, {
              key: '是否支持预约',
              value: '无'
            }],
            [{
              key: '禁止性要求',
              value: '无'
            }],
            [{
              key: '办理地点',
              value: '无'
            }],
            [{
              key: '咨询电话',
              value: '无'
            }, {
              key: '监督电话',
              value: '无'
            }],
            [{
              key: '是否收费',
              value: '无'
            }, {
              key: '收费依据',
              value: '无'
            }],
            [{
              key: '收费标准',
              value: '无'
            }, {
              key: '结果物名称',
              value: '无'
            }],
            [{
              key: '结果物出具外设',
              value: '无'
            }, {
              key: '结果物类型',
              value: '无'
            }],
            [{
              key: '结果物有效期',
              value: '无'
            }, {
              key: '结果物发放方式',
              value: '无'
            }],
            [{
              key: '上年受理量\n\n\n ',
              value: '无'
            }, {
              key: '受理量季节性变化及原因',
              value: '无'
            }],
            [{
              key: '事项责任\n\n\n\n\n\n\n\n\n\n\n\n ',
              value: '无'
            }],
            [{
              key: '权限划分',
              value: '无'
            }, {
              key: '行使层级',
              value: '无'
            }],
            [{
              key: '权力来源',
              value: '无'
            }],
            [{
              key: '受理机构性质',
              value: '无'
            }, {
              key: '受理机构',
              value: '无'
            }],
            [{
              key: '决定机构性质',
              value: '无'
            }, {
              key: '决定机构',
              value: '无'
            }]
          ]
          aa.forEach(item => {
            that.info.push(item)
          })
          console.log('++++++++++')
          console.log(that.info)
          console.log('++++++++++')
          const bb = [
            [{
              key: '申请条件',
              value: '无'
            }]
          ]
          bb.forEach(item => {
            that.tjlist.push(item)
          })
          const cc = [
            [{
              key: '申请规则',
              value: '无'
            }]
          ]
          cc.forEach(item => {
            that.gzlist.push(item)
          })
        }
      })
    },
    obtainName () {
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/loginInfo',
        data: {
          processKey: this.processKey
        },
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!!登路人')
        if (ret.data.errcode === 0) {
          this.name = ret.data.data._user.name
        } else {
          this.$Message.error('登录人加载失败' + ret.data.errmsg)
        }
      })
    },
    statistics () {
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/flowCountService/getFlowNum',
        data: {
          flowId: this.flowId,
          power_type: this.type,
          processKey: this.processKey
        },
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!!统计')
        if (ret.data.errcode === 0) {
          this.reportedNum = ret.data.data.reportedNum
          this.reviewNum = ret.data.data.reviewNum
          this.completedNum = ret.data.data.completedNum
          this.rejectedNum = ret.data.data.rejectedNum
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    },
    initFirst () {
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/insertFormJsonByNodeId',
        data: {
          processKey: this.processKey,
          power_type: this.type,
          flowId: this.flowId

        },
        type: 'post'
      }).then(ret => {
        console.log(ret, '获取渲染表单页面长url')
        if (ret.data.errcode === 0) {
          this.path = ret.data.data.url
          this.process_name = ret.data.data.process_name
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    }
  }
}
</script>
<style>
.base-card {
  height: auto;
  min-height: 46px;
  line-height: 44px;
  border: 1px solid #DDDDDD;
  border-bottom: none;
}

.base-card-first {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.base-card-last {
  border: 1px solid #DDDDDD;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.base-card-text {
  display: flex;
  align-items: center;
  border-right: 1px solid #DDDDDD;
  padding-left: 10px;
  font-size: 12px;
}

.base-card-text-background {
  background: #FAFAFA;
}

.base-card-text-last {
  border-right: none;
}

.local-btn-1 {
  border: unset;
  color: white;
  background: linear-gradient(to right, #4360DB, #4B77B4);
}

.local-btn-2 {
  border: unset;
  color: white;
  background: linear-gradient(to right, #73D5DE, #2DAEBD);
}

.local-btn-3 {
  border: unset;
  color: white;
  background: linear-gradient(to right, #DD2B34, #ED595F);
}

.local-btn-4 {
  border: unset;
  color: white;
  background: linear-gradient(to right, #76BED8, #4291B6);
}

.local-btn-5 {
  border: unset;
  color: white;
  background: linear-gradient(to right, #EBB893, #D08662);
}

.layout-tabs {
  width: 96%;
  height: 44px;
  background: white;
  display: flex;
  margin-top: 10px;
}

.layout-tab {
  width: 100px;
  height: 44px;
  background: white;
  border: 1px solid #F3F5F7;
  text-align: center;
  line-height: 42px;
  margin: 0px -1px 0px -1px;
  /* 去掉重复的边框 */
}

.layout-tab-select {
  color: white;
  background: #4360DB;
}

.ivu-layout-sider {
  /* sider最外层样式 */
  background: white;
  /*         padding: 10px; */
}

.logout-btn:hover,
.layout-tab:hover,
.system-img:hover,
.system-title:hover {
  cursor: pointer
}

.system-logout-container {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  margin-top: 6px;
  align-items: center;
}

.system-logout-item {
  display: inline-block;
  /* font-size: 18px; */
  margin: 0 11px 0 2px;
}

.system-img {
  display: inline-block;
  margin-right: 6px;
  margin-left: 23px;
  margin-top: 5px;
}

.system-title {
  display: inline-block;
  font-size: 23px;
  /* text-decoration: underline; */
  /* border-bottom: 2px solid #fff */
}

.ivu-breadcrumb {
  color: #605f5f;
}

.container1 {
  display: flex;
  /*card容器样式*/
  background-color: #F3F7F9;
  align-items: center;
  flex-direction: column;
}

.container1-area {
  width: 90%;
  height: 74vh;
  overflow: scroll;
  overflow-x: hidden;
}

.container1-card {
  width: 96%;
  /*card样式*/
  margin: 15px 0px 10px 0px;
  padding: 20px 20px 20px 20px;
  background-color: white;
}

.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
  background: #4360DB;
  /*tab样式*/
  color: white;
}

.ivu-tabs-bar {
  border-bottom: 2px solid #4360DB;
  /*横线样式*/
  margin-bottom: 16px;
}

.ivu-layout-header {
  height: 60px;
  /*按钮和header高度重合*/
  line-height: 60px;
  padding: 0px 134px;
  /*按钮位置*/
}

.fdsd {
  position: relative;
  height: 90vh;
  overflow-y: scroll;
}

.fdsd::-webkit-scrollbar {
  display: none
}

.ivu-menu-item {
  font-size: 14px;
  /*按钮文字大小*/
}

.ivu-layout {
  background: white;
}

.ivu-breadcrumb-item-link {
  color: #515a6e;
}

.ivu-modal-content div {
  overflow: auto
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-start {
  display: flex;
  justify-content: flex-start
}
</style>
