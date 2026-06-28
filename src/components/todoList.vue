<template>
    <div class="todoList">
        <div class="midBox">
           <draggable 
            v-model="localList" 
            :options="{ 
                animation: 450,
                // 搜索时禁用拖拽功能，因为此时drag绑定的数组和div循环所依赖的数组不一致；理论上来讲，它们应该是一致的；
                // 我确实在办法实现搜索功能的同时满足拖拽功能，但想了很久最终还是决定放弃了，目前我的水平和对相关知识的掌握还是不足
                disabled: !!searchKeyword
             }" 
            tag="div">
                <div class="listSingle" v-for="thing in filteredList" :key="thing.id">
                    <!-- todo前方的勾选框 -->
                    <div class="select" 
                        @click="changeFace(thing.id)" 
                        :class="{ Active: thing.isClear }">
                        {{ thing.isClear?'✓':' ' }}
                    </div>
                    
                    <!-- 修改内容的功能 -->
                    <span class="text" 
                        @dblclick="edit(thing.id)" 
                        v-if="editId !== thing.id" 
                        :class="{ Done: thing.isClear }">
                        {{ thing.content }}
                    </span>
                    <input type="text"  
                        v-else 
                        v-focus 
                        v-model="editContent" 
                        @blur="editFinish(thing.id)" 
                        @keyup.enter="$event.target.blur()" 
                        @keyup.esc="rollBackContent"
                        placeholder="请输入更改内容..." 
                        class="myInput">
                    
                    <!-- todo后方的删除键 -->
                    <div class="delete" @click="deleteTodo(thing.id)">×</div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<style scoped>
    .myInput {
        box-sizing: border-box;
        width: 50%;
        padding: 10px 15px 10px 25px;
        font-size: 16px;
        border: 2px solid #dce1e8;
        border-radius: 21px;
        background-color: #f8f9fa;
        transition:all 0.3s ease;
    }
    .myInput:focus {
        outline: none;
        border-color: #3498db;
        background: #ffffff;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
    }
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
        background-color: var(--listSingle-backgroundColor);
    }
    .listSingle:hover {
        background: var(--listSingle-backgroundColorChange);
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
        color: var(--singleTodo-textColor);
    }
    .delete {
        width: 36px;
        height: 36px;
        border-radius: 18px;
        font-size: 24px;
        color: var(--singleTodo-deleteColor);
        margin-left: auto;
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
    
    /* .fade-enter {  
        opacity: 0;
        transform: translateY(-10px);
    }
    .fade-enter-active {
        background-color: rgb(229, 252, 229);
        transition: all 0.6s ease;
    } */
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
import draggable from 'vuedraggable'

    export default {
        name:'ToDoList',
        data(){
            return {
                editId:0,
                editContent:'',
                isEsc:false,
                originContent:''
            }
        },
        components:{
            draggable
        },
        directives:{
            focus:{
                inserted(element){
                    element.focus()
                }
            }
        },
        computed:{
            ...mapState(['todoList','searchKeyword']),
            filteredList:{
                get(){
                    if (!this.searchKeyword || !this.searchKeyword.trim()) {
                        return this.todoList
                    }
                    const keyword = this.searchKeyword.trim().toLowerCase()
                    return this.todoList.filter(todo => 
                        todo.content.toLowerCase().includes(keyword)
                    )
                }
            }, 
            localList:{
                get(){
                    return this.todoList
                },
                set(newVal){
                    this.$store.commit('DRAGLISTUPDATE',newVal)
                }
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
            },
            edit(id){
                // 点击后拿到editId 并把内容拿到赋值给输入框
                this.editId = id
                this.editContent = this.todoList.find((todo)=>{
                    return todo.id === id
                }).content
                this.originContent = this.editContent
            },
            editFinish(id){
                if(this.isEsc){
                    this.$message({
                        type: 'info',
                        message: '已取消编辑'
                    })
                }
                else if(!this.editContent){
                   this.$message({
                        message: '编辑后消息不能为空！',
                        type: 'warning'
                    })
                }else if(this.editContent === this.originContent){
                    this.$message({
                        message: '内容不变，撤销编辑！',
                        type: 'info'
                    })
                }else if(this.todoList.find((todo)=>todo.content === this.editContent)){
                    this.$message({
                        message: '该任务已存在！',
                        type: 'warning'
                    })
                }else{
                    this.$store.commit('EDITFINISH',{ id , editContent:this.editContent })
                    this.$message({
                        type: 'success',
                        message: '编辑成功'})
                }
                this.editId = 0,
                this.editContent = ''
                this.isEsc = false
            },
            rollBackContent(event){
                this.isEsc = true
                event.target.blur()
            }
        }
    }
</script>