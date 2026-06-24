<template>
    <div class="todoList">
        <div class="midBox">
            <transition-group name="fade" tag="div">
                <div class="listSingle" v-for="thing in filteredList" :key="thing.id">
                    <div class="select" @click="changeFace(thing.id)" :class="{ Active: thing.isClear }">{{ thing.isClear?'✓':' ' }}</div>
                    <span class="text" :class="{ Done: thing.isClear }">{{ thing.content }}</span>
                    <div class="delete" @click="deleteTodo(thing.id)">×</div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<style scoped>
    .midBox {
        width: 90%;
        margin: 0 auto;
    }
    .midBox {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .listSingle {
        box-sizing: border-box;
        height: 60px;
        padding: 10px 5px 10px 25px;
        margin-bottom: 10px;
        border: 1px solid rgb(231, 231, 231);
        border-radius: 30px;
        font-size: 18px;
        line-height: 40px;
        display: flex;
        align-items: center;
    }
    .listSingle:hover {
        background: rgb(228, 228, 228);
    }
    .select {
        box-sizing: border-box;
        width: 24px;
        height: 24px;
        text-align: center;
        color: white;
        line-height: 20px;
        border:2px solid rgb(173, 173, 173);
        border-radius: 12px;
        background: rgb(235, 235, 235);
        margin-right: 3%;
    }
    .select:hover {
        cursor: pointer;
    }
    .text {
        width: 75%;
    }
    .delete {
        width: 36px;
        height: 36px;
        border-radius: 18px;
        font-size: 24px;
        color: rgb(148, 148, 148);
        margin-left: 10%;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .delete:hover {
        color: rgb(218, 51, 51);
        background-color: yellow;
    }
    .Active {
        background-color: rgb(23, 236, 23);
    }
    .Done {
        text-decoration: line-through;
        color: rgb(104, 104, 104);
    }
    
    .fade-enter {  
        opacity: 0;
        transform: translateY(-10px);
    }
    .fade-enter-active {
        background-color: rgb(229, 252, 229);
        transition: all 0.6s ease;
    }
    /* .fade-leave-active {
        background-color: rgb(253, 197, 197);
        transition: all 0.6s ease;
    }
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    } */
</style>

<script>
import { mapState } from 'vuex';

    export default {
        name:'ToDoList',
        data(){
            return {

            }
        },
        computed:{
            ...mapState(['todoList','searchKeyword']),
            filteredList() {
                if (!this.searchKeyword || !this.searchKeyword.trim()) {
                    return this.todoList
                }
                const keyword = this.searchKeyword.trim().toLowerCase()
                return this.todoList.filter(todo => 
                    todo.content.toLowerCase().includes(keyword)
                )
            }
        },
        methods:{
            deleteTodo(id){
                const result = this.todoList.find((todo)=>{
                    return todo.id === id
                }).content
                this.$confirm(`确定删除任务 ${result} 吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    })
                    .then(() => {
                    this.$store.commit('DELETETODO',id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'})
                    })
                    .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'})        
                })
            },
            changeFace(id){
                this.$store.commit('CHANGESTYLE',id)
            }
        }
    }
</script>