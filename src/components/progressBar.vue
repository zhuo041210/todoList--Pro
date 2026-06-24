<template>
    <div class="mainProgress">
        <div class="midBox">
            <div class="progressContainer">
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
import { mapState } from 'vuex';

    export default {
        name:'MyProgress',
        computed:{
            ...mapState(['todoList']),
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
        }
    }
</script>