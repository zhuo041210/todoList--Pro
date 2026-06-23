<template>
    <div class="todoInput">
        <div class="midBox">
            <input type="text" placeholder="输入任务，按Enter添加" @keyup.enter="addTodo" v-model="todoContent">
            <button @click="addTodo">➕ 添加</button>
        </div>
    </div>
</template>

<style scoped>
    .todoInput {
        margin-bottom: 10px;
    }
    .midBox {
        width: 90%;
        margin: 0 auto;
        display: flex;
        gap: 3%;
        align-items: center;
    }
    input {
        box-sizing: border-box;
        width: 77%;
        padding: 10px 15px 10px 25px;
        font-size: 16px;
        border: 2px solid #dce1e8;
        border-radius: 21px;
        background-color: #f8f9fa;
        transition:all 0.3s ease;
    }
    input:focus {
        outline: none;
        border-color: #3498db;
        background: #ffffff;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
    }
    button {
        width: 20%;
        height: 42px;
        border-radius: 21px;
        border: none;
        background: #4A90D9;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    button:hover {
        background: #4A90D9;
        transform: scale(0.98);
        box-shadow: 0 0 0 2px rgba(74, 144, 217, 0.3);
    }
</style>

<script>
    import { nanoid } from 'nanoid';
import { mapState } from 'vuex';

    export default {
        name:'ToDoInput',
        data(){
            return {
                todoContent:''
            }
        },
        computed:{
            ...mapState(['todoList'])
        },
        methods:{
            addTodo(){
                if(this.todoContent.trim()===''){
                    this.$message({
                        message: '输入事件不能为空！',
                        type: 'warning'
                    })
                }else{                   
                    const result = this.todoList.some((todo)=>{
                        return todo.content === this.todoContent
                    })
                    if(result){
                        this.$message({
                        message: '事件已存在！',
                        type: 'warning'
                    })
                    }else{
                        const newTodo = { id:nanoid(),content:this.todoContent,isClear:false }
                        this.$store.commit('ADDTODO',newTodo)
                        this.todoContent = ''
                    }
                } 
            }
        }
    }
</script>