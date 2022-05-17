<template>
  <div>
    <input type='text' v-model='value' @keydown = "hangleChange">
    <input type='text' v-model='value2' @keydown = "fnThrottleChange">
    <div @click="ddd()" style="width: 50px;height: 50px;background: #2DAEBD"></div>
    <div @click="ceshi()" style="width: 50px;height: 50px;background: #2DAEBD">测试</div>
    <div @click="ceshi2()" style="width: 50px;height: 50px;background: #f66;margin-top: 2px">测试数组转成</div>

    <div @click="ceshi3()" style="width: 50px;height: 50px;background: #f66;margin-top: 2px">测试数组转回</div>
    <div @click="ceshi4()" style="width: 50px;height: 50px;background: #f66;margin-top: 2px">朋友圈</div>
    <CheckboxGroup v-model="formData.zd_type">
      <Checkbox label="1">依申请</Checkbox>
      <Checkbox label="2">免申请</Checkbox>
      <Checkbox label="3">四上</Checkbox>
      <Checkbox label="4">当年兑现</Checkbox>
      <Checkbox label="5">上年度兑现</Checkbox>
      <Checkbox label="6">发展奖励</Checkbox>
      <Checkbox label="7">人才和就业</Checkbox>
      <Checkbox label="8">产业扶持</Checkbox>
      <Checkbox label="9">电商</Checkbox>
      <Checkbox label="10">夜经济</Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
import { Debounce } from '../utils/debounce.js'
import { Throttle } from '../utils/fnThrottle.js'
export default {
  components: {},
  props: {},
  data () {
    return {
      value: '防抖',
      value2: '节流',
      formData: {
        zd_type: []
      }
    }
  },
  computed: {},
  watch: {},
  mounted () {
    const a = [2, 3, 5]
    const b = JSON.stringify(a)
    console.log(b)
  },
  destroyed () {},
  methods: {
    ceshi2 () {
      let arr = ''
      this.formData.zd_type.forEach((e, index, len) => {
        console.log(e, index, len)

        if ((index + 1) === len.length) {
          arr += e
        } else {
          arr += e + ','
        }
      })
      console.log(arr)
      const data = {
        zd_type: '' + arr + ''
      }
      console.log(data)
    },
    ceshi () {
      const routeUrl = ':22/bpmnssdsfsfdsfsf'
      window.open(routeUrl)
    },
    ceshi4 () {
      this.$router.push({
        name: 'pengyouquan'
      })
    },
    ceshi3 () {
      const a = {
        b: '3,4,6,7'
      }
      var tt = a.b.split(',')
      var tdr = JSON.parse(JSON.stringify(tt))

      console.log(tdr)
    },
    ddd () {
      const a = [
        {
          区县推送数量: 503,
          区县驳回公安: 12,
          区防指: '铁西区',
          区县待分配: 340
        },
        {
          区县推送数量: 22,
          区县驳回公安: 1,
          区防指: '法库县',
          区县待分配: 0
        },
        {
          区县推送数量: 451,
          区县驳回公安: 40,
          区防指: '于洪区',
          区县待分配: 14
        },
        {
          区县推送数量: 508,
          区县驳回公安: 77,
          区防指: '和平区',
          区县待分配: 0
        },
        {
          区县推送数量: 413,
          区县驳回公安: 37,
          区防指: '沈河区',
          区县待分配: 77
        },
        {
          区县推送数量: 140,
          区县驳回公安: 8,
          区防指: '苏家屯区',
          区县待分配: 2
        },
        {
          区县推送数量: 344,
          区县驳回公安: 20,
          区防指: '皇姑区',
          区县待分配: 139
        },
        {
          区县推送数量: 312,
          区县驳回公安: 43,
          区防指: '大东区',
          区县待分配: 11
        },
        {
          区县推送数量: 74,
          区县驳回公安: 2,
          区防指: '辽中县',
          区县待分配: 1
        },
        {
          区县推送数量: 388,
          区县驳回公安: 9,
          区防指: '浑南区',
          区县待分配: 158
        },
        {
          区县推送数量: 220,
          区县驳回公安: 8,
          区防指: '沈北新区',
          区县待分配: 41
        },
        {
          区县推送数量: 25,
          区县驳回公安: 0,
          区防指: '康平县',
          区县待分配: 0
        },
        {
          区县推送数量: 106,
          区县驳回公安: 11,
          区防指: '新民市',
          区县待分配: 0
        }
      ]
      let one = 0
      for (const i in a) {
        console.log(a[i].区县推送数量)
        one += a[i].区县推送数量
      }
      console.log(one, 'one')
    },
    /* 防抖 */
    hangleChange: Debounce(function (e) {
      console.log(this.value)
    }),
    // hangleChange (e) {
    //   console.log('++++++++++')
    //   console.log(111)
    //   console.log('++++++++++')
    //   this.hangleChange1()
    // }
    fnThrottleChange: Throttle(function (e) {
      console.log(this.value2)
    })
  }
}
</script>
<style>
.iframe{
  width: 100%;
  height: 1080px;
}
</style>
