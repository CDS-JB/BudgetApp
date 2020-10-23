<template>
    <div class="container">
        <div class="row align-items-center">
            <div class="col-sm">
                <div class="card">
                    <div class="card-body">
                        <login></login>
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <div class="card">
                    <div class="card-body">
                        <register></register>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Login from './login'
import Register from './register'

export default {
    components: {
        'login': Login,
        'register': Register
    }
}
</script>