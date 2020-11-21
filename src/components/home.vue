<template>
    <div>

    </div>
</template>

<script>
export default {
    beforeCreate: function () {
        if (!this.$session.exists()){
            console.error('Unauthenticated. Redirecting to Welcome')
            this.$router.push('/')
        }
    }
}
</script>