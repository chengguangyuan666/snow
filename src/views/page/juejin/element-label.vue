<template>
  <div>
    <el-select v-model="fruit" @change="handleChange">
      <el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fruit: '',
      selectList: [
        { label: '苹果', value: 'apple' },
        { label: '橘子', value: 'orange' }
      ]
    }
  },
  mounted () {
    // 数组排序（升序）
    var arr = [10, 20, 1, 2]
    arr.sort((a, b) => a - b)
    console.log(arr) // [1, 2, 10, 20]

    const printNumbers = {
      phrase: 'The current value is:',
      numbers: [1, 2, 3, 4],

      loop () {
        console.log(this.numbers)
        // this.numbers.forEach((number) => {
        //   console.log(this.phrase, number)
        // })
      }
    }

    printNumbers.loop()
  },
  methods: {
    handleChange (val) {
      let obj = {}
      obj = this.selectList.find(item => item.value === val)
      // obj 就是被选中的那个对象，也就能拿到label值了。
      console.log(obj.label)// label值
      console.log(val)// value值
    }
  }
}
</script>
