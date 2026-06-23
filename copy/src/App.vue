<template>
  <div class="app">
    <h1  :class="{ WorkDay:isWorkDay }" class="title">{{ DateType }}</h1>
    <MyHeader/>
    <div class="rowBox">
      <todoHead/>
      <searchAbout/>
    </div>
    <todoInput/>
    <template  v-if="todoList.length !== 0">
      <todoList/>
      <deleteAbout/>
    </template>
    <h2 class="noRoutine" v-show="todoList.length === 0">✨ 没有待办 · 享受宁静吧</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MyHeader from './components/header.vue';
import todoHead from './components/todoHead.vue';
import todoInput from './components/todoInput.vue';
import todoList from './components/todoList.vue';
import deleteAbout from './components/deleteAbout.vue';
import searchAbout from './components/searchAbout.vue';

import moment from 'moment'
moment.locale('zh-cn')

export default {
  name: 'App',
  components: {
    MyHeader,
    todoHead,
    todoInput,
    todoList,
    deleteAbout,
    searchAbout
  },
  data(){
    return {
      day:'',
      isWorkDay: true
    }
  },
  computed:{
    ...mapState(['todoList']),
    DateType(){
        return this.isWorkDay ? '工作日':'休息日' 
    }
  },
  methods:{
    getTime(){
        const now = moment()
        this.day = now.format('dddd')
        if(this.day === '星期一'||
           this.day === '星期二'||
           this.day === '星期三'||
           this.day === '星期四'||
           this.day === '星期五'){
              this.isWorkDay = true
           }else{
              this.isWorkDay = false
           }
    }
  },
  mounted(){
    this.getTime()
    this.timer = setInterval(() => {
      this.getTime()
    }, 1000);
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<style>
  .app {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    background-color: rgb(254, 254, 254);
    border-radius: 36px;
    box-shadow: 1px 1px 10px 0 rgb(196, 196, 196);
    border: 1px solid rgb(228, 228, 228);
    user-select: none;
  }
  .title {
    text-align: center;
    color: rgb(79, 103, 153);
    font-size: 30px;
  }
  .noRoutine {
    width: 90%;
    height: 150px;
    color: rgb(107, 184, 184);
    margin: 0 auto;
    text-align: center;
    line-height: 150px;
  }
  .WorkDay {
    color: red;
  }
  .rowBox {
    display: flex;
    width: 90%;
    gap: 20px;
    margin: 0 auto;
  }
</style>
