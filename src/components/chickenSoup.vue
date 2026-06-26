<template>
    <div class="chickenSoup">
        <div class="midBox">
            <transition name="fade-up-one">
                <span class="active"
                    v-if="soup"
                    title="这是自己搭建的后端返回的数据哦！">
                    {{ soup }}
                </span>
            </transition>
                <span class="default" v-if="!soup">
                    加载今日鸡汤ing... 
                </span>          
        </div>
    </div>
</template>

<script>
    export default {
        name:"MySoup",
        data(){
            return {
                soup:''
            }
        },
        methods:{
            async getSoup() {
               await new Promise((resolve)=>{
                    setTimeout(() => {
                        resolve()
                    }, 300);
               })
                const isDev = process.env.NODE_ENV === 'development'
                const baseUrl = isDev? 'http://localhost:8888':''
                try {
                    const res = await fetch(`${baseUrl}/.netlify/functions/soup`)
                    const data = await res.json()
                    this.soup = data.message
                }
                catch{
                    this.soup = '加载失败，请稍后重试'
                }
            }
        },
            mounted(){
                this.getSoup()
        }
    }
</script>

<style scoped>
    .midBox {
        width: 90%;
        height: 25px;
        margin: 0 auto 10px auto;
        text-align: center;
        line-height: 25px;
    }
    span {
        display: inline-block;
        font-size: 18px;
        margin: 5px auto 3px auto;
        transition: all 0.4s ease;
    }
    .default {
        color: rgb(129, 129, 129);
    }
    .active {
        color: rgb(32, 184, 32);
    }

    .fade-up-one-enter-active {
        animation: fadeUpOne 0.6s ease forwards;
    }
    @keyframes fadeUpOne {
        0% {
            opacity: 0;
            transform: translateY(12px);
            background-color: rgb(188, 248, 188);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
            background-color: white;
        }
    }
</style>