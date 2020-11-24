<template>
    <div class="modal" style="display: block; background-color: rgba(0,0,0,0.5)">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{options.header.text}}</h5>
                    <button type="button" class="close" @click="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div>{{options.body.text}}</div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="close">Create New</button>
                    <button type="button" class="btn btn-secondary" @click="redirect">Show Payments</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['options'],

    methods: {
        close() {
            this.$emit('close');
        },

        redirect(){
            this.$router.push(this.options.route)
        }
    }
}
</script>