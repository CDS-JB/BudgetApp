<template>
    <div class="loginForm shadow p-3 mb-5 bg-white rounded">
        <form>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="form.username" required>
            </div>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="form.FirstNm" required>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" v-model="form.LastNm" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="form.Password" required>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="form.ConfirmPassword" required>
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
                FirstNm: '',
                LastNm: '',
                Password: '',
                ConfirmPassword: ''
            }
        }
    },

    methods:{
        submit(){
            axios.post('api/register', this.form).then(res => {
                this.$session.start()
                this.$session.set('name', this.form.FirstNm);
                this.$router.push('/home');
            }).catch(err => {
                console.log(err.response.data)
            })
        }
    }
}
</script>