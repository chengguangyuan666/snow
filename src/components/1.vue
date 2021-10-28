<template>
  <div>
    <i-form :model="formInline" :inline="true" scp-type="搜索条" style="background-color:#f0faff;border-color:#abdcff;border-style:solid;border-width:1px;padding:8px 48px 8px 16px;">
      <wl-iview-form-item scp-allowparent="i-form" style="padding:2px;margin-bottom:0px;">
        <div style="padding:1px;min-width:40px;" scp-layout="true">
          <DatePicker style="width: 90%" placeholder="开始时间" type="date" v-model="formInline.start_date"></DatePicker>
        </div>
      </wl-iview-form-item>
      <wl-iview-form-item scp-allowparent="i-form" style="padding:2px;margin-bottom:0px;">
        <div style="padding:1px;min-width:40px;" scp-layout="true">
          <DatePicker style="width: 90%" placeholder="结束时间" type="date" v-model="formInline.end_date"></DatePicker>
        </div>
      </wl-iview-form-item>
      <wl-iview-form-item scp-allowparent="i-form" style="padding:2px;margin-bottom:0px;">
        <div style="padding:1px;min-width:40px;" scp-layout="true">
          <i-button v-on:click="search()" icon="ios-search" scp-type="按钮" style="" type="primary">搜索</i-button>
        </div>
      </wl-iview-form-item>
    </i-form>
    <vxe-table :data="dataTable" scp-type="vxe表格" :stripe="true" style="margin-top:20px;width:100%;" :highlight-hover-row="true" align="center" show-overflow="tooltip">
      <vxe-table-column width="80" type="index" title="序号"></vxe-table-column>
      <vxe-table-column field="name" title="行权事项名称" min-width="300"></vxe-table-column>
      <vxe-table-column field="" title="流程" min-width="200"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span v-if="row.status !=='0'" v-on:click="lcjd(row)" style="cursor: pointer">查看</span><span v-if="row.status ==='0'" style="cursor: pointer">无</span></template></vxe-table-column>
      <vxe-table-column field="create_date" title="创建时间" min-width="200"></vxe-table-column>
      <vxe-table-column field="" width="400" title="操作"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }">
        <i-button v-if="row.status==='0'||row.status==='3'" v-on:click="submit(row)" type="primary">提报</i-button>
        <i-button v-if="row.status==='0'||row.status==='3'" v-on:click="info(row)" style="margin-left:5px " type="success">编辑</i-button>
        <i-button v-if="row.status==='0'||row.status==='3'" v-on:click="deleted(row)" style="margin-left:5px" type="error">删除</i-button>
        <i-button v-if="row.status !=='0'" style="margin-left:5px" type="info"><span v-if="row.status !=='3'" v-on:click="info(row)">详情</span></i-button>
        <i-button v-if="row.status !=='0'" v-on:click="appoveInfo(row)" style="margin-left:5px" type="info">审批履历</i-button><span v-if="row.status==='2'" style="margin-left:5px">
                        <i-button v-if="row.fileUrl" v-on:click="result(row)" type="info">结果物</i-button>
                    </span>
      </template></vxe-table-column>
    </vxe-table>
    <Page :current="pageObj.pageNo" :page-size="pageObj.pageSize" :total="pageObj.totalRecord" v-on:on-change="pageChange" scp-type="分页" :show-sizer="true" style="margin-top:20px;" :show-elevator="true" v-on:on-page-size-change="pageSizeC"></Page>
    <Modal width="60%" style="display: flex" title="结果物" :footer-hide="true" v-model="lcjdmod1">
      <Row justify="center" :gutter="1" scp-type="三格" style="padding:5px;" type="flex">
        <Table :border="true" :data="data1" :stripe="true" :highlight-hover-row="true" :columns="columns1"><template slot-scope="{ row }" slot="action">
          <i-button v-on:click="download(row)" size="small" style="margin-right: 5px" type="primary">下载</i-button>
        </template></Table>
      </Row>
    </Modal>
    <Modal width="85%" style="display: flex;" title="流程图" :footer-hide="true" v-model="lcjdmod">
      <Row justify="center" :gutter="1" scp-type="三格" style="padding:5px 0;" type="flex"><img :src="imgsrc" style="margin-left:10px"></img></Row>
    </Modal>
    <Modal width="85%" style="display: flex" :footer-hide="true" v-model="appoveinfo">
      <Row justify="center" :gutter="1" scp-type="三格" style="padding:5px;" type="flex">
        <vxe-table :data="page.results" scp-type="vxe表格" :stripe="true" style="margin-top:20px;width:100%;" :highlight-hover-row="true" align="center" show-overflow="tooltip">
          <vxe-table-column width="120" type="index" title="序号"></vxe-table-column>
          <vxe-table-column style="" title="审批人" min-width="300"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span style="">{{row.createby}}</span></template></vxe-table-column>
          <vxe-table-column title="状态" min-width="300"><template style="margin:1px;padding:1px;min-height:20px;" scp-layout="true" v-slot="{ row }"><span>{{row.status==1?'通过':'驳回'}}</span></template></vxe-table-column>
          <vxe-table-column title="创建时间" min-width="300"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span style="">{{row.createtime}}</span></template></vxe-table-column>
          <vxe-table-column title="内容" min-width="400"><template style="padding:1px;margin: 1px;min-height:20px" scp-layout="true" v-slot="{ row }"><span style="">{{row.remark}}</span></template></vxe-table-column>
        </vxe-table>
        <Page :current="page.pageNo" :page-size="page.pageSize" :total="page.totalRecord" v-on:on-change="changeModel" scp-type="分页" style="margin-top:20px;" :show-elevator="true" v-on:on-page-size-change="pagechangeModel"></Page>
      </Row>
    </Modal>
    <Modal title="提报" v-model="modalSubmit" v-on:on-ok="ok">
      <p>您是否确认要提报？</p>
    </Modal>
    <Modal title="提报" v-model="modalReject" v-on:on-ok="sure">
      <p>您是否确认要重新提报？</p>
    </Modal>
    <Modal title="删除" v-model="modalDelete" v-on:on-ok="sured">
      <p>您是否确认要删除？</p>
    </Modal>
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      cur: 1,
      modalSubmit: false,
      modalDelete: false,
      pkey: '',
      rpkey: '',
      imgsrc: {},
      vall: 10,
      columns1: [{
        width: '430',
        title: '名称',
        align: 'center',
        key: 'name'
      }, {
        slot: 'action',
        title: '操作',
        align: 'center'
      }],
      lcjdmod: false,
      data1: [],
      rpdk: '',
      rpfl: '',
      pageObj: {
        pageNo: 1,
        pageSize: 10,
        totalRecord: 0
      },
      dfid: '',
      formInline: {},
      appoveinfo: false,
      pdk: '',
      dataTable: [],
      pfl: '',
      modalReject: false,
      page: {
        pageNo: 0,
        pageSize: 10,
        totalRecord: 0
      },
      dpdk: '',
      lcjdmod1: false,
      did: '',
      status: ''
    }
  },
  computed: {},
  watch: {
    '$route' (newVal, oldVal) {
      console.log(newVal.query)
      const ls = Object.values(newVal.query)
      this.status = ls[0]
      console.log(this.status, 'this.statusqqq')
      this.init(this.status)
    }
  },
  mounted () {
    console.log('初始化函数')
    this.init(this.status)
  },
  destroyed () {
    console.log('销毁函数')
  },
  methods: {
    init (val) {
      console.log(val, 'valsss')
      if (!val) {
        val = '0'
      }
      this.$wlAxios.request({
        url: '/api/ac/bizapprove/matterApproveService/selectProcesskeyAllEnd',
        data: {
          status: val
        },
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!')
        if (ret.data.errcode === 0) {
          this.dataTable = ret.data.data.results
          this.pageObj.totalRecord = ret.data.data.totalRecord
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    },
    appoveInfo (row) {
      this.$scp.post('/api/ac/bizpublic/transferService/approval', {
        process_instanceId: row.process_instance_key
      }, this.page)
      this.appoveinfo = true
    },
    lcjd (row) {
      console.log(row, 'rowQQQQ')
      this.imgsrc = 'http://bizplatform.qstb.top/api/ac/bizplatform/flowDiagramService/image?processInstanceId=' + row.process_instance_key
      console.log(this.imgsrc, ' this.imgsrc')
      this.lcjdmod = true
    },
    sure () {
      const data = {
        processKey: this.rpdk,
        key: this.rpkey,
        flowId: this.rpfl,
        status: '1'
      }
      console.log(data, 'bohuitibao')
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/updateReportAgain',
        data: data,
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!')
        if (ret.data.errcode === 0) {
          this.$Message.info('提报成功')
          this.modalReject = false
          this.init(this.status)
        } else {
          this.$Message.error('提报失败' + ret.data.errmsg)
        }
      })
    },
    submit (row) {
      console.log(row, '提报')
      if (row.status === '0') {
        this.pdk = row.process_definition_key
        this.pkey = row.id
        this.pfl = row.flow_id
        this.modalSubmit = true
      } else {
        this.rpdk = row.process_definition_key
        this.rpkey = row.id
        this.rpfl = row.flow_id
        this.modalReject = true
      }
    },
    sured () {
      const data = {
        flowId: this.dfid,
        id: this.did,
        processKey: this.dpdk,
        del_flag: '1'
      }
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/deleteFlow',
        data: data,
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!')
        if (ret.data.errcode === 0) {
          this.$Message.info('删除成功')
          this.modalDelete = false
          this.init(this.status)
        } else {
          this.$Message.error('删除失败' + ret.data.errmsg)
        }
      })
    },
    pageChange (current) {
      if (this.formInline.start_date || this.formInline.end_date) {
        this.formInline.start_date = this.$common.xeUtils.toDateString(this.formInline.start_date, 'yyyy-MM-dd')
        this.formInline.end_date = this.$common.xeUtils.toDateString(this.formInline.end_date, 'yyyy-MM-dd')
      } else {
        this.formInline.start_date = ''
        this.formInline.end_date = ''
      }
      console.log(current, '当前页')
      this.cur = current
      const data = {
        status: this.status,
        pageNo: current,
        pageSize: this.vall,
        start_date: this.formInline.start_date,
        end_date: this.formInline.end_date
      }
      this.$wlAxios.request({
        url: '/api/ac/bizapprove/matterApproveService/selectProcesskeyAllEnd',
        data: data,
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!')
        if (ret.data.errcode === 0) {
          this.dataTable = ret.data.data.results
          this.pageObj.totalRecord = ret.data.data.totalRecord
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
    search () {
      console.log(this.formInline, 'formInline')
      if (this.formInline.start_date || this.formInline.end_date) {
        this.formInline.start_date = this.$common.xeUtils.toDateString(this.formInline.start_date, 'yyyy-MM-dd')
        this.formInline.end_date = this.$common.xeUtils.toDateString(this.formInline.end_date, 'yyyy-MM-dd')
      } else {
        this.formInline.start_date = ''
        this.formInline.end_date = ''
      }
      const data = {
        status: this.status,
        start_date: this.formInline.start_date,
        end_date: this.formInline.end_date
      }
      console.log(data, 'data')
      this.$wlAxios.request({
        url: '/api/ac/bizapprove/matterApproveService/selectProcesskeyAllEnd',
        data: data,
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!')
        if (ret.data.errcode === 0) {
          this.dataTable = ret.data.data.results
          this.pageObj.totalRecord = ret.data.data.totalRecord
        } else {
          this.$Message.error('数据加载失败' + ret.data.errmsg)
        }
      })
    },
    pageSizeC (val) {
      if (this.formInline.start_date || this.formInline.end_date) {
        this.formInline.start_date = this.$common.xeUtils.toDateString(this.formInline.start_date, 'yyyy-MM-dd')
        this.formInline.end_date = this.$common.xeUtils.toDateString(this.formInline.end_date, 'yyyy-MM-dd')
      } else {
        this.formInline.start_date = ''
        this.formInline.end_date = ''
      }
      console.log(val, 'val')
      this.vall = val
      const data = {
        status: this.status,
        pageSize: val,
        pageNo: this.cur,
        start_date: this.formInline.start_date,
        end_date: this.formInline.end_date
      }
      this.$wlAxios.request({
        url: '/api/ac/bizapprove/matterApproveService/selectProcesskeyAllEnd',
        data: data,
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!')
        if (ret.data.errcode === 0) {
          this.dataTable = ret.data.data.results
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
    pagechangeModel (val) {
      console.log(val, 'ww')
      this.$scp.post('/api/ac/bizpublic/transferService/approval', {
        process_instanceId: row.process_instance_key,
        pageSize: val
      }, this.page)
    },
    deleted (row) {
      this.dfid = row.flow_id
      this.did = row.id
      this.dpdk = row.process_definition_key
      this.modalDelete = true
    },
    changeModel (val) {
      console.log(val, 'ee')
      this.$scp.post('/api/ac/bizpublic/transferService/approval', {
        process_instanceId: row.process_instance_key,
        pageNo: val
      }, this.page)
    },
    ok () {
      const data = {
        processKey: this.pdk,
        key: this.pkey,
        flowId: this.pfl
      }
      console.log(data, 'tibao')
      this.$wlAxios.request({
        url: '/api/ac/generalreporting/generalReporting/saveApplyReportById',
        data: data,
        type: 'post'
      }).then(ret => {
        console.log(ret, 'ret!!!')
        if (ret.data.errcode === 0) {
          this.$Message.info('提报成功')
          this.modalSubmit = false
          this.init(this.status)
        } else {
          this.$Message.error('提报失败' + ret.data.errmsg)
        }
      })
    },
    info (row) {
      console.log(row, 'row')
      // window.location.href = 'http://bizsubmitportal.tripln.com/scpcw/#/generalreporting/generalReport/lmq-home-page/' + row.process_definition_key + '/' + row.flow_id
      // window.location.href = 'http://bizapprove.qstb.top/scpcw/#/generalreporting/generalReport/approveIndex' + '/' + row.process_definition_key + '/' + row.flow_id

      const query = this.$route.query
      query.a = row.id
      //     let location1 = {
      //         query
      //     }
      //     this.$router.push(location1)
      // const location = {
      //     query
      // }
      const path = '/generalreporting/generalReport/approveIndex/' + this.processKey + '/' + this.flowId
      this.$router.push({
        path: path,
        query
      })
      // this.$router.push(location)
    }
  }
}
</script>
<style>

</style>
