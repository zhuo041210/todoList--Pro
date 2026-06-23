<template>
    <div class="delete">
        <div class="midBox">
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
        justify-content: flex-end;
    }
    .myButton {
        width: 25%;
        height: 34px;
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
            ...mapState(['todoList'])
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
                
            }
        }
    }
</script>