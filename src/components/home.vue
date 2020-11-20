<template>
    <div>
        You are signed in! <button type="button" class="btn btn-outline-dark" @click="logout">Log Out</button>
    </div>
</template>

<script>
export default {
    beforeCreate: function () {
        if (!this.$session.exists()){
            console.error('Unauthenticated. Redirecting to Welcome')
            this.$router.push('/')
        }
    },

    methods: {
        logout(){
            this.$session.destroy()
            this.$router.push('/')
        }
    }
}
</script>