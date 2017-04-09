<template>
    <div class="Typeahead">
        <i class="fa fa-spinner fa-spin" v-if="loading"></i>
        <template v-else>
            <i class="fa fa-search" v-show="isEmpty"></i>
            <i class="fa fa-times" v-show="isDirty" @click="reset"></i>
        </template>

        <input type="text"
               class="Typeahead__input"
               placeholder="Search twitter user"
               autocomplete="off"
               v-model="query"
               @keydown.down="down"
               @keydown.up="up"
               @keydown.enter="hit"
               @keydown.esc="reset"
               @blur="reset"
               @input="update"/>

        <ul v-show="hasItems">
            <li v-for="(item, $item) in items" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
                <span class="name" v-text="item.label"></span>
                <span class="screen-name" v-text="item.screen_name"></span>
            </li>
        </ul>
    </div>
</template>



<script>
    import VueTypeahead from 'vue-typeahead'

    export default {
        extends: VueTypeahead,
        props: [ 'entity' ],
        data () {
            return {
                src: '/search_categories/' + this.entity,
                limit: 20,
                minChars: 1
            }
        },
        methods: {
           onHit (item) {
                this.query = item.label
            },
            prepareResponseData (data) {
                // data = ...
                return data
            }
        }
    }
</script>
