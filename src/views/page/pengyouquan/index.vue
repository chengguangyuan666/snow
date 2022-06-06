<template>
  <div>

    <img :src="topimg" alt="" class="topimg">

    <div class="top-name">{{name}}</div>
    <img :src="touxiangimg" alt="" class="big-tou">

    <div class="xiaoxi flex-start">
      <img :src="zanimg" alt="" class="zan-img">
      <div>99条新消息</div>
    </div>

    <div class="line"></div>
<!--    大盒子-->
    <div style="padding: 17px" class="flex-start">
      <div class="touxiang-box"><img :src="touxiangimg" alt="" class="touxiang-img"></div>
      <div class="flex-column" style="width: 100%;">
        <div class="name">{{name}}</div>
        <div class="content">{{content}}</div>
        <div class="img-box">
          <img :src="img" alt="" class="img">
        </div>
        <div class="flex-between m-t-10">
          <div class="time">1分钟前</div>
          <div class="two-dian flex-enev">
            <div class="landian"></div>
            <div class="landian"></div>
          </div>
        </div>

<!--        评论区-->
        <div class="flex-column comment-box">
          <div class="flex-start zan-box">
            <svg t="1652854881196" class="icon" style="margin-top: 2px;margin-right: 3px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="970" width="16" height="16"><path d="M515.75 865.88A28 28 0 0 1 500 861c-38.56-26.3-376.4-262.12-376.4-443.29 0-219.13 140.38-252 224.06-252.09h0.16c57.1 0 124.75 29.16 168 69.94 43.05-40.48 110.64-69.64 167.87-69.94 67.23-0.17 120.64 18.79 159.07 57 43.25 43 65.17 108.62 65.17 195.06 0 181.17-337.83 417-376.34 443.3a28.06 28.06 0 0 1-15.84 4.9zM347.81 221.64h-0.1c-113.11 0.11-168.09 64.25-168.09 196.07 0 122.08 229.28 310.2 336.13 386 106.84-75.82 336.12-263.94 336.12-386 0-71-16.37-123.25-48.65-155.34C775.75 235 734.69 220.76 684 221.64 633 221.91 566.37 255 538.53 294c-10.53 14.66-35 14.66-45.57 0C462 250.69 393 221.64 347.81 221.64z" fill="#465F8E" p-id="971"></path></svg>
            <div class="zan-name" v-for="(item, index) in zanList" :key="index">{{item.name}},</div>
          </div>
          <div  class="line"></div>

          <el-row :gutter="20">
            <el-col :span="2"><svg t="1652856626717" class="icon" style="max-width:16px;margin-top: 12px;margin-right: 3px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="941" width="16" height="16"><path d="M356.9664 905.0624c-7.7312 0-15.5648-1.6384-23.04-5.0176-20.1728-9.1136-32.7168-28.5184-32.7168-50.6368v-68.864h-40.8064c-73.0112 0-132.4544-59.392-132.4544-132.4544V294.0416c0-73.0112 59.392-132.4544 132.4544-132.4544h502.016c73.0112 0 132.4544 59.392 132.4544 132.4544v354.048c0 73.0112-59.392 132.4544-132.4544 132.4544h-243.5584l-125.3888 110.5408c-10.3936 9.216-23.296 13.9776-36.5056 13.9776zM260.4544 212.7872C215.6544 212.7872 179.2 249.2416 179.2 294.0416v354.048c0 44.8 36.4544 81.2544 81.2544 81.2544h92.0064v120.064c0 0.7168 0 2.816 2.56 3.9936 2.56 1.1776 4.1472-0.256 4.6592-0.7168l139.9296-123.3408h262.8608c44.8 0 81.2544-36.4544 81.2544-81.2544V294.0416c0-44.8-36.4544-81.2544-81.2544-81.2544H260.4544z" fill="#465F8E" p-id="942"></path><path d="M311.3472 480.9728m-46.848 0a46.848 46.848 0 1 0 93.696 0 46.848 46.848 0 1 0-93.696 0Z" fill="#465F8E" p-id="943"></path><path d="M511.4368 480.9728m-46.848 0a46.848 46.848 0 1 0 93.696 0 46.848 46.848 0 1 0-93.696 0Z" fill="#465F8E" p-id="944"></path><path d="M713.7792 480.9728m-46.848 0a46.848 46.848 0 1 0 93.696 0 46.848 46.848 0 1 0-93.696 0Z" fill="#465F8E" p-id="945"></path></svg></el-col>
            <el-col :span="22">
              <el-row  v-for="(item, index) in commentList" :key="index" style="margin-top: 10px">
                <el-col :span="4"><div class="com-touxiang-box"><img :src="item.img" alt="" class="com-touxiang-img"></div></el-col>
                <el-col :span="20">
                  <div style="text-align: initial;font-weight: 500">
                    <div class="com-name">{{ item.name }}</div>
                    <div class="flex-start" v-if="item.toname">
                      <span>回复</span>
                      <span style="color: #465F8E;margin-left: 2px">{{item.toname}}：</span>{{ item.say }}
                    </div>
                    <div class="flex-start" v-else>
                      {{ item.say }}
                    </div>
                  </div>
                </el-col>
                <div  class="zhongline" v-if="index!==0"></div>
              </el-row>

            </el-col>
          </el-row>

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
      name: '绿豆饼爱思考',
      // topimg: 'http://oss.lngov.top/bizlicense/house/Wl/73d73f7a2030a1e61eb871725821c9c71652779699569.JPG',
      topimg: 'https://pic3.zhimg.com/v2-a9180556d2109c4fba5e843f6c80c158_720w.png?source=d6434cab',
      zanimg: 'http://oss.lngov.top/bizlicense/house/Wl/451fb0c523b319712655e887d4e6b91e1652769698668.JPG',
      touxiangimg: 'http://oss.lngov.top/bizlicense/house/Wl/199b497e53b62c9217f4a765bdeca6871652779633263.JPG',
      img: 'http://oss.lngov.top/bizlicense/house/Wl/d495e49b9ca9b6534abbc377192fca561652780097121.png',
      content: '发射爱心给你发射爱心给你发射爱心给你发射爱心给你发射爱心给你发射爱心给你发射爱心给你发射爱心给你发射爱心给你们',
      commentList: [{
        name: '反光洙',
        img: 'https://pic3.zhimg.com/v2-a9180556d2109c4fba5e843f6c80c158_720w.png?source=d6434cab',
        say: '明天又涨价了'
      }, {
        name: 'd',
        img: 'https://pic3.zhimg.com/v2-a9180556d2109c4fba5e843f6c80c158_720w.png?source=d6434cab',
        say: '明天又涨价了',
        toname: '刘达'
      }],
      zanList: [{ name: '王大爷' }, { name: '王大爷' }, { name: '王大爷' }, { name: '王大爷' }, { name: '王大爷' }, { name: '王大爷' }, { name: '王大爷' }, { name: '王大爷' }, { name: '王大爷' }]
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
  background: #E3E3E3;
}
.zhongline{
  height: 1px;
  background: #E3E3E3;
  margin-top: -6px;
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
  justify-content: flex-start;

}
.flex-enev{
  display: flex;
  justify-content: space-evenly;
  align-items: center
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
.com-touxiang-box{
  width: 40px;
  height: 40px;
  min-width: 40px;
  margin-right: 12px;
}
.touxiang-img{
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.com-touxiang-img{
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
.topimg{
  width: 100%;
}
.big-tou{
  width: 75px;
  height: 75px;
  border-radius: 5px;
  position: relative;
  top: -84px;
  right: -132px;
}
.top-name{
  position: relative;
  top: -43px;
  /*right: -17px;*/
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.m-t-10{
  margin-top: 10px;
}
.time{
  color: #999999;
}
.two-dian{
  width: 33px;
  height: 21px;
  border-radius: 5px;
  background: #f5f5f5;
}
.landian{
  width: 4px;
  height: 4px;
  background: #465F8E;
  border-radius: 10px;
}
.comment-box{
  background: #f5f5f5;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
}
.zan-name{
  font-size: 14px;
  margin-right: 2px;
  font-weight: 600;
  color: #465F8E;
}
.zan-box{
  flex-wrap:  wrap
}
.com-name{
  font-size: 14px;
  font-weight: 500;
  color: #465F8E;
}
</style>
