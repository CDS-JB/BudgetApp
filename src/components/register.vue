<template>
    <div>
        <form>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="form.username" required>
            </div>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="form.firstname" required>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" v-model="form.lastname" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="form.password" required>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="form.confirmPassword" required>
            </div>
            <button type="button" class="btn btn-outline-dark" @click="submit">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                username: '',
                firstname: '',
                lastname: '',
                password: '',
                confirmPassword: ''
            }
        }
    },

    methods:{
        submit(){
            axios.post('api/register', this.form).then(res => {
                this.$session.start()
                this.$router.push('/home');
            }).catch(err => {
                console.log(err.response.data)
            })
        }
    }
}
</script>