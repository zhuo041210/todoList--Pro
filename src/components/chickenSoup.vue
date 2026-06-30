<template>
    <div class="chickenSoup">
        <div class="midBox">
            <transition name="fade-up-one">
                <span class="active"
                    style="transition: none;"
                    v-if="soup"
                    @click="changeSoup"
                    :title="`这是自己搭建的后端返回的数据哦！已喝${soupNum}碗鸡汤`">
                    {{ soup }}
                </span>
            </transition>
                <span class="default" v-if="!soup">
                    加载今日鸡汤ing...🥣
                </span>       
        </div>
    </div>
</template>

<script>
    export default {
        name:"MySoup",
        data(){
            return {
                soup:'',
                soupNum:0
            }
        },
        methods:{
            async getSoup() {
               await new Promise((resolve)=>{
                    setTimeout(() => {
                        resolve()
                    }, 300)
               })
                const isDev = process.env.NODE_ENV === 'development'
                const baseUrl = isDev? 'http://localhost:8888':''
                try {
                    const res = await fetch(`${baseUrl}/.netlify/functions/soup`)
                    const data = await res.json()
                    this.soup = data.message
                    this.soupNum = this.soupNum + 1
                }
                catch{
                    this.soup = '加载鸡汤失败，请稍后重试'
                }
            },
            changeSoup(){
                this.soup = ''
                this.$nextTick(() => {
                    this.getSoup()
                })
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
        /* transition: all 0.4s ease; */
        /* 排查最久的错误 transition和animation是两套完全不同的机制 不能混用 不然退场会延迟 */
    }
    .default {
        color: rgb(129, 129, 129);
        transition: none !important;;
    }
    .active {
        color: var(--soup-textColor);
        transition: all 0s ease !important;
    }

    .fade-up-one-enter-active {
        animation: fadeUpOne 0.3s ease forwards;
    }
    @keyframes fadeUpOne {
        0% {
            opacity: 0;
            transform: translateY(12px);
            background-color: var(--soup-changeToColor);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
            background-color: var(--soup-changeColor);
        }
    }
</style>