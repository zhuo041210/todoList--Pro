<template>
    <div class="modeBox">
        <div class="moonBox">
            <!-- solid是实心，表示为此状态 -->
            <i class="fa-solid fa-moon fa-xl" v-if="isNight" @click=" $message('已处于夜晚模式！');"></i>
            <i class="fa-regular fa-moon fa-xl" v-else @click="changeModeTo(true)"></i>
        </div>
        <div class="sunBox">
            <i class="fa-solid fa-sun fa-xl" v-if="!isNight" @click=" $message('已处于日间模式！');"></i>
            <i class="fa-regular fa-sun fa-xl" v-else @click="changeModeTo(false)"></i>
        </div>
    </div>
</template>

<style scoped>
    .modeBox {
        position: absolute;
        top: 40%;
        right: 0px;
        transform: translate(-50%,-50%);
        display: flex;
    }
    .moonBox {
        color: purple;
    }
    .sunBox {
        color: rgb(255, 97, 97);
    }
    i {
        cursor: pointer;
    }
</style>

<script>
import { mapState } from 'vuex';

    export default {
        name:'ChangeMode',
        data(){
            return{

            }
        },
        computed:{
            ...mapState(['isNight'])
        },
        methods:{
            changeModeTo(val){
                this.$store.commit('CHANGEMODETO',val)
            }
        }
    }
</script>