<template>
    <div class="container">
        <div v-if="showLogin"><login></login></div>
        <div v-else><register></register></div>
        <div>
            <button type="button" class="btn btn-outline-dark loginButton" @click="showLogin = !showLogin">{{showLogin ? 'Register' : 'Login'}}</button>
        </div>
    </div>
</template>

<script>
import Login from "./login";
import Register from "./register";

export default {
    beforeCreate: function () {
        if(this.$session.exists()){
            this.$router.push('/home')
        }
    },

    data() {
        return {
            showLogin: true,
        };
    },

    components: {
        login: Login,
        register: Register,
    },
};
</script>