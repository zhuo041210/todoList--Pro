<template>
  <div class="popOut" @mouseenter="continuePop" @mouseleave="finishPop">
    <h3>😊 完成情况</h3>

    <div ref="chartDom" class="chart-container"></div>
    <div class="bottomBox">
      <span class="boxOne">已完成&nbsp;✅&nbsp;{{ doneNumber }}</span>
      <span class="boxTwo">未完成&nbsp;📌&nbsp;{{ undoneNumber }}</span>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MyPop',
  data() {
    return {
      chartInstance: null, // 存图表实例
      timeId:null
    }
  },
  computed: {
    ...mapState(['todoList', 'timerId', 'isPop']),
    doneNumber(){
      return this.todoList.filter((todo)=>{
        return todo.isClear === true
      }).length
    },
    undoneNumber(){
      return this.todoList.length - this.doneNumber
    }
  },
  watch: {
    isPop(val) {
      if (val) {
        this.$nextTick(() => {
          this.initChart()
        })
      } else {
        this.disposeChart()
      }
    }
  },
  methods: {
    initChart() {
      const dom = this.$refs.chartDom
      if (!dom) return
      if (this.chartInstance) {
        this.chartInstance.dispose()
      }
      this.chartInstance = window.echarts.init(dom)
      this.chartInstance.setOption(this.getChartOption())
      window.addEventListener('resize', this.resizeChart)
    },
    disposeChart() {
      if (this.chartInstance) {
        this.chartInstance.dispose()
        this.chartInstance = null
        window.removeEventListener('resize', this.resizeChart)
      }
    },
    resizeChart() {
      this.chartInstance?.resize()
    },
    getChartOption() {
      const done = this.todoList.filter(todo => todo.isClear).length
      const total = this.todoList.length
      const percent = ((done / total) * 100).toFixed(2)
      return {
        tooltip: { trigger: 'item',formatter: '{b}: {c}项 ({d}%)' },
        series: [
          {
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: '#fff',
              borderWidth: 4
            },
            label: {
              show: true,
              position: 'center',
              formatter: `${percent}%`,
              fontSize: 24,
              fontWeight: 'bold',
              color: '#333'
            },
            data: [
              { value: done, name: '已完成', itemStyle: { color: '#52c41a' },emphasis: { itemStyle: { color: '#45a338' } }},
              { value: total - done, name: '未完成', itemStyle: { color: '#e8e8e8' },emphasis: { itemStyle: { color: '#d0d0d0' } }  }
            ]
          }
        ]
      }
    },
    // 定时器相关功能
    continuePop() {
      clearTimeout(this.timerId)
    },
    finishPop() {
      this.timeId = setTimeout(() => {
        this.$store.commit('TOGGLEPOP', false)
      }, 400)
      this.$store.commit('TIMERID', this.timeId)
    }
  },
  mounted() {
    // 如果默认显示，初始化图表
    if (this.isPop) {
      this.$nextTick(() => this.initChart())
    }
  },
  beforeDestroy() {
    this.disposeChart()
  }
}
</script>

<style scoped>
.popOut {
  box-sizing: border-box;
  position: absolute;
  left: -280px;
  top: -230px;
  width: 300px;
  height: 320px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  padding: 16px 20px 20px;
}

.popOut h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #333;
}
.chart-container {
  width: 100%;
  height: 230px;
}
.bottomBox {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>