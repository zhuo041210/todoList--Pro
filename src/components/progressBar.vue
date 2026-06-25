<template>
    <div class="mainProgress">

        <!-- 悬浮框组件，还在完善！ -->
        <popAbout v-show="isPop"/>

        <div class="midBox">
            <div class="progressContainer" @mouseenter="popOut" @mouseleave="popLeave" >
                <span class="span">📊 
                    &nbsp;&nbsp; 当前完成情况 &nbsp;&nbsp; 
                    {{ doneNumber }}/{{ allNumber }} &nbsp;&nbsp;
                    {{ donePercent }}%
                </span>
                <div class="progress" :style="percent"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .mainProgress {
        position: relative;
        margin: 15px 0;
    }
    .midBox {
        width: 90%;
        height: 16px;
        margin: 0 auto;
    }
    .progressContainer {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: rgb(231, 231, 231);
        overflow: hidden;
    } 
    .progress {
        height: 100%;
        border-radius: 8px;
        transition: all 0.4s ease;
    }
    .span {
        position: absolute;
        font-size: 12px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>

<script>
import popAbout from './popAbout.vue';

import { mapState } from 'vuex';

    export default {
        name:'MyProgress',
        data(){
            return {
                timeId:null
            }
        },
        components:{
            popAbout
        },
        computed:{
            ...mapState(['todoList','isPop','timerId']),
            doneNumber(){
                return this.todoList.filter((todo)=>{
                    return todo.isClear === true
                }).length
            },
            allNumber(){
                return this.todoList.length
            },
            donePercent(){
                return (this.doneNumber/this.allNumber * 100).toFixed(2)
            },
            changeColor(){
                const p = this.donePercent
                if( p>=0 && p <= 20 ) return '#ff4d4f'
                else if( p>20 && p <= 40 ) return '#fa8c16'
                else if( p>40 && p <= 60 ) return '#faad14'
                else if( p>60 && p <= 80 ) return '#1890ff'
                else return '#52c41a'
            },
            percent(){
                return {
                    width:this.donePercent + '%',
                    "background-color": this.changeColor
                }
            }
        },
        methods:{
            popOut(){
                clearTimeout(this.timerId)
                this.$store.commit('TOGGLEPOP',true)
            },
            popLeave(){
                this.timeId = setTimeout(() => {
                    this.$store.commit('TOGGLEPOP',false)
                }, 500)
                this.$store.commit('TIMERID',this.timeId)
            }
        }
    }
</script>