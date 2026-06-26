<template>
    <div class="chickenSoup">
        <div class="midBox">
            <h4>{{ soup || '加载今日鸡汤ing...' }}</h4>
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
                const isDev = process.env.NODE_ENV === 'development'
                const baseUrl = isDev? 'http://localhost:8888':''
                try {
                    const res = await fetch(`${baseUrl}/.netlify/functions/soup`)
                    console.log('res数据',res)
                    const data = await res.json()
                    console.log('data数据',data)
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
        color: lightgreen;
    }
    h4 {
        font-size: 18px;
        margin: 5px auto 3px auto;
    }
</style>