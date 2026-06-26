<template>
    <div class="todoHead">
        <div class="midBox">
            <h2>📋 待办清单</h2>
            <span class="smallNumber">{{ count }}</span>
        </div>
    </div>
</template>

<style scoped>
    .midBox {
        /* width: 99%; */
        margin: 0 auto;
        display: flex;
        gap: 15px;
        align-items: center;
    }
    .smallNumber {
        min-width: 25px;
        height: 15px;
        border-radius: 10px;
        padding: 5px;
        background-color: rgb(146, 162, 255);
        color: white;
        text-align: center;
        line-height: 12px;
    }
    .todoHead {
        flex: 1;
        min-width: 180px;
    }
</style>

<script>
import { mapState } from 'vuex';

    export default {
        name:'ToDoHead',
        data(){
            return {
                
            }
        },
        computed:{
            ...mapState(['todoList']),
            count(){
                return this.todoList.filter((todo)=>{
                    return todo.isClear === false
                }).length
            }
        }
    }
</script>