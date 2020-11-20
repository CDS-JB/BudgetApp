<template>
    <div>
        <header>
            <nav v-if="displayNav" class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand">
                    <img src="/images/user.png" width="30" height="30" class="d-inline-block align-top" alt="">
                    Hi (name)
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"><a class="nav-link" href="/home">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="/budget">Budget</a></li>
                        <li class="nav-item"><a class="nav-link" href="/settings">Settings</a></li>
                        <li class="nav-item"><a class="nav-link" href="/about-us">About Us</a></li>
                        <li class="nav-item"><a class="nav-link" href="" @click="logout">Logout</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
export default {
    data(){
        return {
            displayNav: true
        }
    },

    methods: {
        logout(){
            if(this.$session.exists()){
                this.$session.destroy()
                this.$router.push('/')
            }
        },

        checkSession(){
            if(this.$session.exists()){
                this.displayNav = true
            } else {
                this.displayNav = false
            }
        }
    },

    watch: {
        $route: function (to, from) {
            this.checkSession()
        }
    },

    mounted() {
        this.checkSession()
    }
}
</script>