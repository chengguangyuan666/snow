<template>
  <div>
    <h1>This is an about page</h1>
    <div  v-for="(item,index) in unitname" :key="index" >
      <input  v-model="item.name">
    </div>
    <div @click="add">anniu</div>
  </div>
</template>
<script>

export default {
  components: {},
  name: 'About',
  data () {
    return {
      ss: 'er',
      unitname: [
        {
          name: '211'
        },
        {
          name: '11'
        }
      ]
    }
  },
  methods: {
    async init () {

    },
    add () {
      let a = 0
      for (let i = 0; i < 30000; i++) {
        a = a + 1
        this.unitname.push({
          name: a
        })
      }
    }
  },
  async mounted () {
    // await this.init()
  },
  watch: {},
  computed: {
  }
}
</script>
