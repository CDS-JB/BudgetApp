<template>
    <div>
        <header>
            <nav v-if="displayNav" class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand">
                    <img src="/images/user.png" width="30" height="30" class="d-inline-block align-top" alt="">
                    Hi {{displayName}}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item"><a class="nav-link" href="/home">Home</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" style="cursor: pointer" @click="show = !show" v-on-clickaway="away">Payments</a>
                            <div class="dropdown-menu" :class="show ? 'show' : ''">
                                <a class="dropdown-item" style="color: #212529 !important; border: 0" href="/payments/index">Show All</a>
                                <a class="dropdown-item" style="color: #212529 !important; border: 0" href="/payments/create">Create</a>
                            </div>
                        </li>
                        <li class="nav-item"><a class="nav-link" href="/settings">Settings</a></li>
                        <li class="nav-item"><a class="nav-link" href="/about-us">About Us</a></li>
                        <li class="nav-item"><a class="nav-link" style="cursor: pointer" @click="logout">Logout</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        <main>
            <router-view @updateSession="updateSession"></router-view>
        </main>
    </div>
</template>

<script>
import {mixin as clickaway} from 'vue-clickaway';

export default {
    mixins: [clickaway],

    data(){
        return {
            displayNav: true,
            displayName: '',
            show: false
        }
    },

    methods: {
        logout(){
            if(this.$session.exists()){
                axios.post("/api/logout")
                    .then((res) => {
                        this.$session.destroy()
                        this.$router.push('/')
                    }).catch((err) => {
                        console.error(err.response.data);
                    })
            }
        },

        checkSession(){
            if(this.$session.exists()){
                this.updateDisplayName()
                this.displayNav = true
            } else {
                this.displayNav = false
            }
        },

        updateSession(){
            this.updateDisplayName()
        },

        updateDisplayName(){
            this.displayName = this.$session.get('FirstNm')
        },

        away(){
            this.show = false;
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