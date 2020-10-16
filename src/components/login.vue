<template>
    <div>
        <form>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="form.username" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="form.password" required>
            </div>
            <button type="button" class="btn btn-outline-dark" @click="submit">Login</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },

    methods:{
        submit(){
            console.log("Login button clicked")
        }
    }
}
</script>