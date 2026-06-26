<template>
        <div class="boarder">
            <div class="clock-time" title="时钟组件">
                {{ time }}
            </div>
            <div class="clock-date" title="日期组件">
                {{ date }}
                {{ day }}
            </div>
        </div>
</template>

<style scoped>
    .boarder {
        width: 90%;
        margin: 0 auto;
        display: flex;
        align-items: flex-end;
        justify-content: space-evenly;
        flex-wrap: wrap;
        border-bottom: 2px solid rgba(167, 167, 167, 0.24) ;
        margin-bottom: 5px;
    }
    .clock-time {
        height: 80px;
        line-height: 70px;
        font-size: 70px;
        font-weight: 200;
        color: rgb(97, 189, 206);
        /* background-color: rgba(191, 235, 170, 1); */
        /* border-radius: 15px; */
        text-shadow: 1px 1px 3px rgb(139, 177, 235);
    }
    .clock-date {
        padding: 5px 20px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: 500;
        color: rgb(65, 124, 233);
        text-shadow: rgb(123, 229, 236);
        margin-bottom: 10px;
        background-color: rgb(197, 238, 181);
        border-radius: 20px;
    }
</style>

<script>
    import moment from 'moment'

    moment.locale('zh-cn')

    export default {
        name:'MyHeader',
        data(){
            return {
                time:'',
                date:'',
                day:''
            }
        },
        methods:{
            getTime(){
                const now = moment()
                this.time = now.format('HH:mm:ss')
                this.date = now.format('YYYY年MM月DD日')
                this.day = now.format('dddd')
            }
        },
        mounted(){
            this.getTime()
            this.timer = setInterval(this.getTime, 1000);
        },
        beforeDestroy(){
            clearInterval(this.timer)
        }
    }
</script>