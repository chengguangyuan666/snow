<template>
  <div>
    <input type='text' v-model='value' @keydown = "hangleChange">
    <input type='text' v-model='value2' @keydown = "fnThrottleChange">
    <iframe class="iframe"  v-once src="http://bizapprove.qstb.top/scpcw/#/bizapprove/ymxr/moniterapprove?path=%2FflowHtmlCache%2F7a7a09fd-4d0b-11ec-a354-0242ac110002%2Ffe8bb9dbdef646f0995dc67c68bda8d4&ids=%5Bobject%20Object%5D" ></iframe>
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
      value2: '节流'
    }
  },
  computed: {},
  watch: {},
  mounted () {

  },
  destroyed () {},
  methods: {
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
