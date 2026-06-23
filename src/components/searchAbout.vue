<template>
    <div class="searchAbout">
        <input type="text" placeholder="搜索任务..." class="MyInput" v-model="searchContent" @keyup.enter="searchTodo">
        <span class="searchIcon" @click="searchTodo">🔍</span>
    </div>
</template>

<style>
    .searchIcon {
        font-size: 25px;
        line-height: 1;
    }
    .searchIcon:hover {
        cursor: pointer;
    }
    .searchAbout {
        display: flex;
        flex: 2;
        align-items: center;
        gap: 15px;
        /* vertical-align: middle; */
    }
    .MyInput {
        width: 70%;
        padding: 8px 20px;
        font-size: 17px;
        color: #2c3e50;
        background: #f7f9fc;
        border: 2px solid #dce1e8;
        border-radius: 20px;
        outline: none;
    }
</style>

<script>
    export default {
        name:'MySearch',
        data(){
            return {
                searchContent:''
            }
        },
        methods:{
            searchTodo(){
                this.$store.commit('SEARCHKEYWORD',this.searchContent)
            }
        }
    }
</script>