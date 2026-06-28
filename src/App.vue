<template>
    <div class="app">
      <div class="top">
        <h1  :class="{ WorkDay:isWorkDay }" class="title" title="动态判断工作/休息日">{{ DateType }}</h1>
        <darkMode/>
      </div>
      <chickenSoup/>
      <MyHeader/>
      <div class="rowBox">
        <todoHead/>
        <searchAbout/>
      </div>
      <todoInput/>
        <todoList/>
        <transition name="BarAni">
          <progressBar v-if="todoList.length !== 0"/>
        </transition>
        <transition name="DeleteAni">
          <deleteAbout v-if="todoList.length !== 0"/>
        </transition>
        <transition name="RestAni">
          <h2 class="noRoutine" v-if="todoList.length === 0">✨ 没有待办 · 享受宁静吧</h2>
        </transition>
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
import progressBar from './components/progressBar.vue';
import chickenSoup from './components/chickenSoup.vue';
import darkMode from './components/darkMode.vue';


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
    searchAbout,
    progressBar,
    chickenSoup,
    darkMode
  },
  data(){
    return {
      day:'',
      isWorkDay: true,
    }
  },
  computed:{
    ...mapState(['todoList','isNight']),
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
  watch:{
    isNight:{
      handler(newVal){
        document.documentElement.classList.toggle('dark',newVal)
      },
      immediate:true
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

<!-- 这是一项大工程 要改一百多个样式 -->
<style>
  * {
    transition: background-color 0.5s ease,
    color 0.5s ease,
    border-color 0.5s ease,
    box-shadow 0.5s ease,
    text-shadow 0.5s ease;
  }

  :root {
    --html-backgroundColor: rgb(192, 255, 184);
    --app-backgroundColor: rgb(254, 254, 254);
    --time-textColor:  rgb(97, 189, 206);
    --date-textColor: rgb(65, 124, 233);
    --date-backgroundColor: rgb(197, 238, 181);
    --soup-textColor: rgb(32, 184, 32);
    --soup-changeColor: white;
    --soup-changeToColor: rgb(188, 248, 188);
    --list-textColor: black;
    --inputBottom-backgroundColor: #4A90D9;
    --checkall-textColor: black;
    --listSingle-backgroundColor: white;
    --listSingle-backgroundColorChange: rgb(228, 228, 228);
    --search-borderColor: #3498db;
    --add-borderColor: #3498db;
    --singleTodo-textColor: black;
    --singleTodo-deleteColor: rgb(148, 148, 148);
  }

  .dark {
    --html-backgroundColor: rgb(19, 19, 19);
    --app-backgroundColor:  #181818;
    --time-textColor:  #e6edf3;
    --date-textColor: #e6edf3;
    --date-backgroundColor: rgb(55, 133, 24);
    --soup-textColor: #e6edf3;
    --soup-changeColor: #181818;
    --soup-changeToColor: rgb(255, 255, 255);
    --list-textColor: white;
    --inputBottom-backgroundColor: rgb(88, 228, 60);
    --checkall-textColor: #e6edf3;
    --listSingle-backgroundColor: #818cf8;
    --listSingle-backgroundColorChange: rgb(77, 216, 226);
    --search-borderColor: #c084fc;
    --add-borderColor: #c084fc;
    --singleTodo-textColor: #e6edf3;
    --singleTodo-deleteColor: #e6edf3;
  }
</style>

<style scoped>
  .app {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    background-color: var(--app-backgroundColor);
    border-radius: 36px;
    box-shadow: 1px 1px 10px 0 rgb(196, 196, 196);
    border: 1px solid rgb(228, 228, 228);
    user-select: none;
  }
  /* 炫彩休息日！ */
  .title {
    text-align: center;
    font-size: 30px;
    background: linear-gradient(to right, 
      #ff0000, #ff7f00, #ffff00, #00ff00,
      #0000ff, #4b0082, #8b00ff
    );
    background-size: 200% auto;
    /* 直接复制的 有时间去学习一下clip属性 */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: rainbowMove 9s linear infinite;
  }
  @keyframes rainbowMove {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 200% center;
    }
  }
  /* 炫彩休息日！ */
  .noRoutine {
    width: 90%;
    height: 150px;
    color: rgb(107, 184, 184);
    margin: 0 auto;
    text-align: center;
    line-height: 150px;
  }
  /* .WorkDay {
    color: red;
  } */
  .rowBox {
    display: flex;
    width: 90%;
    gap: 20px;
    margin: 0 auto 3px auto;
  }
  /* 进度条简单动画 */
  .BarAni-enter {  
        opacity: 0;
        transform: translateY(-10px);
  }
  .BarAni-enter-active {
        transition: all 0.6s ease;
  }
  /* .BarAni-leave-active {
        transition: all 0.6s ease;
  }
  .BarAni-leave-to {
        opacity: 0;
        transform: translateY(-10px);
  } */
  /* 右下删除框简单动画 */
  .DeleteAni-enter {  
        opacity: 0;
        transform: translateY(-10px);
  }
  .DeleteAni-enter-active {
        transition: all 0.6s ease;
  }
  /* .DeleteAni-leave-active {
        transition: all 0.6s ease;
  }
  .DeleteAni-leave-to {
        opacity: 0;
        transform: translateY(-10px);
  } */
  /* 无任务时简单动画 */
  .RestAni-enter {  
        opacity: 0;
        transform: translateY(30px);
  }
  .RestAni-enter-active {
        transition: all 0.6s ease;
  }
  h1 {
    margin-bottom: 5px;
  }
  .top {
    position: relative;
    display: flex;
    justify-content: center;
  }
</style>
