<template>
  <div>

    <div class="xiaoxi flex-start">
      <img src="http://oss.lngov.top/bizlicense/house/Wl/451fb0c523b319712655e887d4e6b91e1652769698668.JPG" alt="" class="zan-img">
      <div>99条新消息</div>
    </div>

    <div class="line"></div>
<!--    大盒子-->
    <div style="padding: 17px" class="flex-start">
      <div class="touxiang-box"><img src="http://oss.lngov.top/bizlicense/house/Wl/c58c06f9d1ec96184e0c198532ddef521652757994627.jpg" alt="" class="touxiang-img"></div>
      <div class="flex-column">
        <div class="name">风雨踏歌行</div>
        <div class="content">我老妹说闪促啊好我老妹说闪促啊好我老妹说闪促啊好我老妹说闪促啊好我老妹说闪促啊好我老妹说闪促啊好我老妹说闪促啊好我老妹说闪促啊好我老妹说闪促啊好</div>
        <div class="img-box">
          <img src="http://oss.lngov.top/bizlicense/house/Wl/c58c06f9d1ec96184e0c198532ddef521652757994627.jpg" alt="" class="img">
        </div>
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

    }
  },
  computed: {},
  watch: {},
  mounted () {

  },
  destroyed () {},
  methods: {

  }
}
</script>
<style>
.line{
  height: 1px;
  background: #f0f0f0;
}
.flex-between{
  display: flex;
  justify-content: space-between;
}
.flex-column{
  display: flex;
  flex-direction:  column;
}

.flex-start{
  display: flex;
  justify-content: flex-start
}
.flex-around{
  display: flex;
  justify-content:  space-around;
}
.touxiang-box{
  width: 45px;
  height: 45px;
  min-width: 45px;
  margin-right: 12px;
}
.touxiang-img{
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.name{
  color: #465F8E;
  font-weight: 600;
  font-size: 16px;
  text-align: initial;
}
.content{
  font-weight: 400;
  color:black;
  font-size: 16px;
  text-align: initial;
  margin-top: 3px;
  margin-bottom: 5px;
}
.img-box{
  width: 150px;
}
.img{
  width: 100%;
  height: 100%;
}
.xiaoxi{
  padding: 5px;
  width: 190px;
  background: black;
  color: white;
  font-weight: bold;
  margin: 0 auto;
  margin-top: 60px;
  line-height: 36px;
  margin-bottom: 15px;
  border-radius: 5px;
  text-align: center;
}
.zan-img{
  width: 36px;
  height: 36px;
  border-radius: 5px;
  margin-right: 30px;
}
</style>
