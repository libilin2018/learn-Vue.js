<template>
  <div class="pie-wrap">
    <div :style="{ animationDelay: delay}" :class='["pie", {"pie-all": num == 100}]'>
      <div class="pie-inner">
        <p class="percent">{{num}}%</p>
        <p class="txt">本月收缴率</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pie',
  data () {
    return {
      num: 0
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    delay () {
      // 转化为延迟多少秒
      return `-${this.num}s`
    }
  },
  mounted () {
    this.startAnimate(1, this.percent, 50)
  },
  watch: {
    percent () {
      // console.log(this.percent)
      this.startAnimate(1, this.percent, 50)
    }
  },
  methods: {
    // 匀动动画
    startAnimate (step, limit, speed) {
      // console.log(this.num, typeof limit)
      setTimeout(() => {
        if (this.num < limit) {
          this.num += step
          this.startAnimate(step, limit, speed)
        } else {
          this.num = limit
        }
      }, speed)
    }
  }
}
</script>

<style lang='scss' scoped>
  .pie-wrap {
    width: 100%;
    height: 200px;
    text-align: center;
    .pie {
      display: inline-block;
      position: relative;
      width: 160px;
      height: 160px;
      margin-top: 40px;
      border-radius: 50%;
      background: #ccc;
      background-image: linear-gradient(to right, transparent 50%, #4479FD 0);
      color: transparent;
      text-align: center;
    }
    .pie::before {
      content: '';
      position: absolute;
      top: 0; left: 50%;
      width: 50%; height: 100%;
      border-radius: 0 100% 100% 0 / 50%;
      background-color: inherit;
      transform-origin: left;
      animation: spin 50s linear infinite, bg 100s step-end infinite;
      animation-play-state: paused;
      animation-delay: inherit;
    }
    .pie-all {
      background: #4479FD;
      background-image: none;
    }
    .pie-all::before {
      background-color: #4479FD;
    }

    @keyframes spin {
      to { transform: rotate(.5turn); }
    }
    @keyframes bg {
      50% { background: #4479FD; }
    }   
    .pie-inner {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 80%; height: 80%;
      border-radius: 50%;
      background: #fff;
      transform: translate(-50%, -50%);
      .percent {
        margin-top: 35px;
        font-size: 30px;
        color: #000;
      }
      .txt {
        font-size: 15px;
        color: #ccc
      }
    }
  }
</style>