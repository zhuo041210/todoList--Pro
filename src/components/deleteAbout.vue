<template>
    <div class="delete">
        <div class="midBox">
            <div class="container" @click="changeAll">
                <div class="select"  :class="{changeFace:isAll}">{{ isAll ? '✓':' ' }}</div>
                <span class="mySpan" >全选所有任务</span>
            </div>
            <button class="myButton" @click="deleteMulti">🗑️ 清空完成任务</button>
        </div>
    </div>
</template>

<style scoped>
    .delete {
        width: 90%;
        margin: 0 auto;
        box-sizing: border-box;
    }
    .midBox {
        margin: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap:6px;
    }
    .container {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .container:hover {
        cursor: pointer;
    }
    .myButton {
        width: 25%;
        height: 34px;
        margin: 0 0 0 auto;
        line-height: 34px;
        border: none;
        border-radius: 17px;
        background: linear-gradient(135deg, #78d0d6 0%, #0dd11d 100%);
        color: white;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(87, 112, 223, 0.4);
    }
    .mySpan {
        font-size: 14px;
        line-height: 35px;
    }
    .select {
        box-sizing: border-box;
        width: 18px;
        height: 18px;
        text-align: center;
        color: white;
        line-height: 14px;
        font-size: 12px;
        border:2px solid rgb(173, 173, 173);
        border-radius: 9px;
        background-color: rgb(235, 235, 235);
    }
    .changeFace {
        background-color: rgb(23, 236, 23);
    }
</style>

<script>
import { mapState } from 'vuex';

    export default {
        name:'MyDelete',
        data(){
            return {

            }
        },
        computed:{
            ...mapState(['todoList']),
            isAll(){
                const doneListLength = this.todoList.filter((todo=>{
                    return todo.isClear === true
                })).length
                if(doneListLength === this.todoList.length) return true
                else return false
            }
        },
        methods:{
            deleteMulti(){
                const nowList = this.todoList.filter(todo => {
                    return todo.isClear === false
                })
                if(nowList.length === this.todoList.length){
                    this.$message({
                    message: '目前没有已完成的任务',
                    type: 'warning'
                    });
                }else{
                    this.$confirm(`确定删除已完成的 ${this.todoList.length - nowList.length} 项任务吗?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        })
                        .then(() => {
                        this.$store.commit('DELETEMULTI',nowList)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'})
                        })
                        .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消删除'})        
                    })
                }
            },
            changeAll(){
                if(this.isAll){
                    this.$store.commit('CLEARALL')
                }else{
                    this.$store.commit('FINISHALL')
                }
            }
        }
    }
</script>