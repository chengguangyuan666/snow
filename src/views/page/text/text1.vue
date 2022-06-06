<template>
  <div>
    <div class="flex-between top-box">
      <div class="flex-start">
        <div v-on:click="clickTitle" class="system-img"><img src="https://z3.ax1x.com/2021/07/15/WmKMsU.png" alt="" style="width:34px;height:34px;top: 8px; position: relative;"></img></div>
        <div v-on:click="clickTitle" class="system-title">沈阳市行权治理(监督)一体化平台</div>
      </div>
      <div class="">
        <div></div><img src="https://z3.ax1x.com/2021/07/15/WmKMsU.png" alt="" style="width:20px;margin-bottom: -0.34rem;"></img>
        <div class="system-logout-item">{{name}}</div><img v-on:click="logout" src="https://z3.ax1x.com/2021/07/15/Wm2wCj.png" alt="" style="width:12px;height:12px;margin-bottom: -0.09rem;" class="logout-btn"></img>
        <div v-on:click="logout" style="font-size: 13px; font-weight: 600;" class="system-logout-item logout-btn">注销</div>
      </div>
    </div>
    <Layout>
      <Sider class="layout-sider">
        <div v-on:click="click(1)" class="layout-sider-item"><img src="https://z3.ax1x.com/2021/07/15/WnPNc9.png" alt="" class="layout-sider-item-select" v-show="currentClick == 1"></img><img src="https://z3.ax1x.com/2021/08/20/fOQnaj.png" alt="" style="width:140px;height:50px;"></img>
          <div class="layout-sider-item-text">办事指南</div>
        </div>
        <div v-on:click="click(2)" class="layout-sider-item"><img src="https://z3.ax1x.com/2021/07/15/WnPNc9.png" alt="" class="layout-sider-item-select" v-show="currentClick == 2"></img><img src="https://z3.ax1x.com/2021/08/20/fOlnOO.png" alt="" style="width:140px;height:50px;"></img>
          <div class="layout-sider-item-text">申报</div>
        </div>
        <div v-on:click="click(3)" class="layout-sider-item"><img src="https://z3.ax1x.com/2021/07/15/WnPNc9.png" alt="" class="layout-sider-item-select" v-show="currentClick == 3"></img><img src="https://z3.ax1x.com/2021/08/20/fOlKmD.png" alt="" style="width:140px;height:50px;"></img>
          <div class="layout-sider-item-text">待提报</div>
        </div>
        <div v-on:click="click(5)" class="layout-sider-item"><img src="https://z3.ax1x.com/2021/07/15/WnPNc9.png" alt="" class="layout-sider-item-select" v-show="currentClick == 5"></img><img src="https://z3.ax1x.com/2021/08/20/fOlypq.png" alt="" style="width:140px;height:50px;"></img>
          <div class="layout-sider-item-text">审核中</div>
        </div>
        <div v-on:click="click(6)" class="layout-sider-item"><img src="https://z3.ax1x.com/2021/07/15/WnPNc9.png" alt="" class="layout-sider-item-select" v-show="currentClick == 6"></img><img src="https://z3.ax1x.com/2021/08/20/fOlLnO.png" alt="" style="width:140px;height:50px;"></img>
          <div class="layout-sider-item-text">已办结</div>
        </div>
        <div v-on:click="click(4)" class="layout-sider-item"><img src="https://z3.ax1x.com/2021/07/15/WnPNc9.png" alt="" class="layout-sider-item-select" v-show="currentClick == 4"></img><img src="https://z3.ax1x.com/2021/08/20/fO193t.png" alt="" style="width:140px;height:50px;"></img>
          <div class="layout-sider-item-text">已驳回({{rejectedNum}})</div>
        </div>
      </Sider>
      <Layout>
        <div style="display:flex;padding:10px; font-weight: 700;">
          <Breadcrumb separator=">">
            <BreadcrumbItem>
              {{ process_name }}
            </BreadcrumbItem>
            <BreadcrumbItem>
              {{bread}}
            </BreadcrumbItem>
          </Breadcrumb><img v-on:click="gohome" src="https://z3.ax1x.com/2021/07/15/Wm2Vu6.png" alt="" style="width:12px;height:12px;margin: 2px 0 0 auto;"></img>
          <div v-on:click="clickTitle" style="margin: -1px 0px 0px 5px;  font-weight: 600;font-size: 13px;" class="system-logout-item logout-btn">返回首页</div>
        </div>
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
                      <i-button v-if="currentClick != 3" v-on:click="krAction('look',row)" size="small" :loading="isBtnLoading" style="margin-left:5px;" type="success" class="local-btn-1">详情</i-button>
                      <i-button v-if="(currentClick == 3|currentClick ==4)" v-on:click="krAction('edit',row)" size="small" style="margin-left:5px;" type="info" class="local-btn-2">编辑</i-button>
                      <i-button v-if="(currentClick == 3|currentClick ==4)" v-on:click="krAction('del',row)" size="small" style="margin-left:5px" type="error" class="local-btn-3">删除</i-button>
                      <i-button v-if="currentClick != 3" v-on:click="appoveInfo(row)" size="small" :id="row.process_instance_key" style="margin-left:5px;" type="primary" class="local-btn-4">审批履历</i-button><span v-if="(currentClick == 6|currentClick ==4)">
                                                    <i-button v-if="row.fileUrl" v-on:click="result(row)" size="small" :id="row.process_instance_key" style="margin-left:5px;" type="primary" class="local-btn-5  resultCss">结果物</i-button>
                                                </span>
                    </template></vxe-table-column>
                  </vxe-table>
                  <Page :current="pageObj.pageNo" :page-size="pageObj.pageSize" :total="pageObj.totalRecord" v-on:on-change="pageChange" scp-type="分页" style="margin-top: 20px;margin-bottom: 20px;text-align: center;" :show-total="true" v-on:on-page-size-change="pageSizeChange"></Page>
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
                    <vxe-table-column title="状态" min-width="300"><template style="margin:1px;padding:1px;min-height:20px;" scp-layout="true" v-slot="{ row }"><span>{{row.status}}</span></template></vxe-table-column>
                    <vxe-table-column title="创建时间" min-width="300"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span style="">{{row.createtime}}</span></template></vxe-table-column>
                    <vxe-table-column title="内容" min-width="400"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span :title="row.remark" style="">{{row.remark}}</span></template></vxe-table-column>
                  </vxe-table>
                  <Page :current="page.pageNo" :page-size="page.pageSize" :total="page.totalRecord" v-on:on-change="changeModel" scp-type="分页" style="margin-top:20px;" :show-elevator="true"></Page>
                </Row>
              </Modal>
            </div>
          </div>
          <div v-if="show == 1" class="container1">
          </div>
          <div v-if="show == 9">

          </div>
        </Content>
      </Layout>
    </Layout>
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
      process_name: '',
      isedit2: false,
      curr: [],
      imgsrc: {},
      lcjdmodT: false,
      rejectedNum: 0,
      isBtnLoading: false,
      info: [],
      lodingStatus: false,
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
      currentShow: false,
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
      formItemPublic: {},
      bread: '申报',
      lcjdmod: false,
      delModal: false,
      data1: [],
      Process_instance_key: '',
      reviewNum: 0,
      confirmModalT: false,
      tjlist: [],
      publicitycontent: [],
      currentClick: 2,
      publicContent: '',
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
      dataTable: {},
      handleListContent: [],
      imgsrcT: {},
      lcjdmod1: false,
      formline: {},
      modalPublic: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  beforeMount () {},
  mounted () {
    console.log('++++++++++')
    console.log(this.$route.query, this.$route.params, 'query,params')
    console.log('++++++++++')
    this.$wlUtils.setJustLoginUrl('http://bizsubmitportal.tripln.com/#/login?a=')
    // console.log(this.$route.params.flowId, 'this.$route.flowId')
    this.flowId = this.$route.params.flowId
    this.processKey = this.$route.params.processKey
    this.type = this.$route.params.Type
    // 测试用
    // this.flowId = '2a2d733aeeb7429794f49b403180fb76'

    this.colt()
    this.initFirst()
    this.obtainName()
    // 办件公示
    this.handlingPublicity()
    // 从申报指南页跳过来
    if (this.$route.query.clicknow) {
      this.click(this.$route.query.clicknow)
    }
  },
  destroyed () {},
  methods: {
    clickTitle () {
      if (document.domain.indexOf('tripln') == -1) {
        window.location.href = 'http://hzc.shenyang.gov.cn/#/'
      } else {
        window.location.href = 'http://bizsubmitportal.tripln.com/#/'
      }
    },
    appoveInfo (row) {
      console.log(row, '审批履历')
      this.Process_instance_key = row.process_instance_key
      this.$scp.post('/api/ac/bizpublic/transferService/approval', {
        process_instanceId: row.process_instance_key
      }, this.page)
      this.appoveinfo = true
    },
    lcjd (row) {
      const timestamp = this.$common.xeUtils.timestamp()
      console.log(timestamp, 'timestamp')
      console.log(row, 'rowQQQ')
      this.imgsrc = 'http://bizplatform.qstb.top/api/ac/bizplatform/flowDiagramService/image?processInstanceId=' + row.process_instance_key + '&timestamp=' + timestamp
      if (document.domain.indexOf('tripln') == -1) {
        this.imgsrc = this.imgsrc.replace(/bizplatform.qstb.top/, 'hzc.shenyang.gov.cn')
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
          power_type: this.type,
          status: 0,
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
            power_type: this.type,
            flowId: this.flowId,
            id: this.delMod.id,
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
            power_type: this.type,
            flowId: this.flowId,
            id: this.delMod.id,
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
              power_type: this.type,
              key: this.delMod.id,
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
              power_type: this.type,
              processKey: this.processKey,
              key: this.delMod.id,
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
          power_type: this.type,
          status: status,
          flowId: this.flowId,
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
    click (e) {
      // e = 2
      this.formline = {}
      if (this.lodingStatus) {
        return
      }
      this.currentClick = e
      this.bread = this.breadObj[e]
      // 显示某某div
      if (e == 5 | e == 6 | e == 4) {
        this.show = 3
      } else if (e == 1) {
        const path = '/generalreporting/generalReport/DeclarationGuide/' + this.processKey + '/' + this.flowId + '/' + this.type
        console.log(path)
        this.$router.push({
          path: path
        })
      } else {
        this.show = 9
        setTimeout(() => {
          this.show = e
        }, 500)
      }

      if (e == 3 | e == 5 | e == 6 | e == 4) {
        // 查询各个列表
        console.log('dianjishijian')
        this.queryList(e)
      }

      if (this.isedit2 != true) {
        this.destory()
        console.log('qing')
      } else {
        this.isedit2 = false
      }
      this.destory()
      this.statistics() // 调统计接口
    },
    queryList (e) {
      let status
      if (e == 3) {
        status = 0
        this.lodingStatus = true
        setTimeout(() => {
          this.lodingStatus = false
          this.getnewlist(status)
        }, 3500)
      } else if (e == 5) {
        status = 1
        this.lodingStatus = true
        setTimeout(() => {
          this.getnewlist(status)
          this.lodingStatus = false
        }, 4000)
      } else if (e == 6) {
        status = 2
      } else if (e == 4) {
        status = 3
      }

      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/selectFlow',
        data: {
          status: status,
          power_type: this.type,
          processKey: this.processKey,
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

      const e = this.currentClick
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
      console.log('+++++status+++++')
      console.log(e)
      console.log(status)
      console.log('+++++status+++++')

      // bug 需要传分页参数
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/selectFlow',
        data: {
          status,
          power_type: this.type,
          processKey: this.processKey,
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
    getnewlist (e) {
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/selectFlow',
        data: {
          status: e,
          power_type: this.type,
          processKey: this.processKey,
          flowId: this.flowId
        },
        type: 'post'
      }).then(ret => {
        if (ret.data.errcode === 0) {
          const colObj = {}
          this.columns.forEach(e => {
            if (e.dictObj) {
              colObj[e.col] = e.dictObj
            }
          }) // 构造字典对象
          this.dataTable = ret.data.data
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
        console.log(that.publicitycontent, 'publicitycontent')
        const temporary = []
        that.publicitycontent.forEach(item => {
          if (item.content) {
            item.content = JSON.parse(item.content)
            console.log(item.content, 'name_cn')
            for (let i = 0; i < item.content.length; i++) {
              console.log(item.content[i].name_cn, 'name_cn')
              temporary.push(item.content[i].name_cn)
            }
            item.newcontent = temporary.join(',')
          }
          if (item.public_params) {
            item.public_params = JSON.parse(item.public_params)
          }
        })
        console.log(temporary, 'temporary')
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
      this.$scp.post('/api/ac/bizpublic/transferService/approval', {
        process_instanceId: this.Process_instance_key,
        pageNo: val
      }, this.page)
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
          flowId: this.flowId,
          power_type: this.type
        },
        type: 'post'
      }).then(ret => {
        console.log(ret, '获取渲染表单页面长url')
        if (ret.data.errcode === 0) {
          this.path = ret.data.data.url
          this.process_name = ret.data.data.process_name
          this.statistics()
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

.layout-sider-item-select {
  position: absolute;
  top: -10px;
  left: -7px;
  width: 174px;
  height: 80px;
}

.layout-sider-item-unselect {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 168px;
  height: 80px;
}

.layout-sider-item-text {
  position: absolute;
  color: white;
  top: 23px;
  font-size: 14px;
  font-weight: 600;
  left: 24px;
}

.layout-sider-item {
  position: relative;
  margin-top: 20px;
  cursor: pointer;
  border: 1px solid #F6F5F6;
  /* margin-top: 20px; */
  padding: 8px 6px 2px 7px;
}

.layout-sider {
  display: flex;
  flex-direction: column;
  height: 900px;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #3333;
}

.ivu-layout-sider {
  /* sider最外层样式 */
  background: white;
  padding: 10px;
}

.logout-btn:hover,
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

.menu11 {
  background-color: #FFBB00;
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
  font-size: 17px;
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

.top-box {
  height: 80px;
  line-height: 80px;
  background: #385EC7;
  color: white;
}
</style>
