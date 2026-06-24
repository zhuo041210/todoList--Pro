import Vue from "vue";
import vuex from 'vuex';

Vue.use(vuex)

const actions = {

}

const mutations = {
    ADDTODO(state,value){
        state.todoList.push(value)
        localStorage.setItem('todoList',JSON.stringify(state.todoList))
    },
    DELETETODO(state,value){
        state.todoList = state.todoList.filter( todo => todo.id !== value )
        localStorage.setItem('todoList',JSON.stringify(state.todoList))
    },
    CHANGESTYLE(state,value){
        const result = state.todoList.find( todo => todo.id === value )
        if(result){
            result.isClear = !result.isClear
            localStorage.setItem('todoList',JSON.stringify(state.todoList))
        }
    },
    DELETEMULTI(state,result){
        state.todoList = result
        localStorage.setItem('todoList',JSON.stringify(state.todoList))
    },
    SEARCHKEYWORD(state, keyword) {
        state.searchKeyword = keyword
    },
    CLEARALL(state){
        state.todoList.forEach(todo => {
            todo.isClear = false
        })
        localStorage.setItem('todoList',JSON.stringify(state.todoList))
    },
    FINISHALL(state){
        state.todoList.forEach(todo => {
            todo.isClear = true
        })
        localStorage.setItem('todoList',JSON.stringify(state.todoList))
    },
    EDITFINISH(state,{id,editContent}){
        const result = state.todoList.find((todo)=>{
            return todo.id === id
        })
        result.content = editContent
        localStorage.setItem('todoList',JSON.stringify(state.todoList))
    }
}

const state = {
    todoList:(()=>{
        try {
            return localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : []
        }catch{
            localStorage.removeItem('todoList')
            return []
        }
    })(),
    searchKeyword: ''
}

const getters = {

}

export default new vuex.Store({
    actions,
    mutations,
    state,
    getters
})