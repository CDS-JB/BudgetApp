<template>
    <div class="loginForm shadow p-3 mb-5 bg-white rounded">
        <form>
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="user.username" required>
            </div>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="user.firstname" required>
            </div>
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" v-model="user.lastname" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="user.password" required>
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="user.confirmPassword" required>
            </div>
            <button type="button" class="btn btn-outline-dark" @click="update">Update</button>
            <button type="button" class="btn btn-outline-dark" @click="reset">Reset</button>
        </form>
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

    data() {
        return {
            user: {
                username: '',
                firstname: '',
                lastname: '',
                password: '',
                confirmPassword: ''
            },
            backupUser: {
                username: '',
                firstname: '',
                lastname: '',
                password: '',
                confirmPassword: ''
            }
        }
    },

    methods: {
        update() {
            axios.post("/api/updateuser", this.user)
                .then((res) => {
                    this.$session.set('name', this.user.firstname)

                    this.backupUser.username = this.user.username
                    this.backupUser.firstname = this.user.firstname
                    this.backupUser.lastname = this.user.lastname
                    this.user.password = ''
                    this.user.confirmPassword = ''
                }).catch((err) => {
                    console.error(err.response.data)
                })
        },

        reset() {
            for (const [key, value] of Object.entries(this.backupUser)){
                this.user[key] = value
            }

            this.user.password = ''
            this.user.confirmPassword = ''
        }
    },

    mounted() {
        this.backupUser.firstname = this.user.firstname
        axios.get("/api/edituser")
            .then((res) => {
                this.user.username = res.data.username
                this.user.firstname = res.data.firstname
                this.user.lastname = res.data.lastname

                this.backupUser.username = res.data.username
                this.backupUser.firstname = res.data.firstname
                this.backupUser.lastname = res.data.lastname
            }).catch((err) => {
                console.error(err.response.data);
            })
    }
}
</script>