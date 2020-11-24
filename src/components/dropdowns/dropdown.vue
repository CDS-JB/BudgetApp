<template>
    <div class="dropdown">
        <button type="button" class="btn dropdown-toggle" @click="show = !show" v-on-clickaway="away" :disabled="disabled">{{selectedItem}}</button>
        <div class="dropdown-menu" :class="show ? 'show' : ''" style="max-height: 200px; overflow-y: auto;">
            <button v-for="item in options.items" :key="item" class="dropdown-item" type="button" @click="selected(item)">{{item}}</button>
        </div>
    </div>
</template>

<script>
import {mixin as clickaway} from 'vue-clickaway'

export default {
    mixins: [clickaway],

    props: ['customOptions', 'disabled', 'setSelected'],

    data() {
        return {
            show: false,
            options: {
                items: [],
            },
            selectedItem: '-'
        }
    },

    methods: {
        away(){
            this.show = false
        },

        selected(item){
            this.show = false
            this.$emit('select', item)
        },

        setOptions(){
            for(let key in this.options){
                if(this.options[key] != this.customOptions[key]){
                    this.options[key] = this.customOptions[key]
                }
            }
        }
    },

    mounted(){
        this.setOptions()
    },

    watch: {
        'customOptions': {
            deep: true,
            handler: function() {
                this.setOptions();
            }
        },

        'setSelected': function () {
            this.selectedItem = this.setSelected
        }
    }
}
</script>