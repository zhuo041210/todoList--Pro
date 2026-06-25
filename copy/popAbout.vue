<template>
  <div class="popOut" @mouseenter="continuePop" @mouseleave="finishPop">
    <h3>我是一个弹出框！！！</h3>
    <!-- 加入Echarts图表 -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        name:"MyPop",
        data(){
            return {
                timeId:null
            }
        },
        computed:{
            ...mapState(['todoList','timerId','isPop'])
        },
        methods:{
            continuePop(){
                clearTimeout(this.timerId)
            },
            finishPop(){
                this.timeId = setTimeout(() => {
                    this.$store.commit('TOGGLEPOP',false)
                }, 500)
                this.$store.commit('TIMERID',this.timeId)
            }
        }
    }
</script>

<style>
    .popOut {
        box-sizing: border-box;
        position: absolute;
        left: -280px;
        top: -230px;
        width: 300px;
        height: 300px;
        background: #ffffff;
        box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        padding: 20px;
        }
</style>