<template>

    <div>
        <div class="panel-row defaultrow">
            Default category

            <autocomplete2 v-if="main_category.label" name="label"
                          url="/search_categories/FeedBeslist/"
                          anchor="label"
                          label="name"
                           :entity="entity"
                           :initValue="main_category.label"
                           :placeholder="main_category.label"
                           :on-select="setMain"
                          ></autocomplete2>

            <autocomplete2 v-else name="label"
                           url="/search_categories/FeedBeslist/"
                           anchor="label"
                           label="name"
                           :entity="entity"
                           :on-select="setMain"
                           ></autocomplete2>

        </div>

        <div class="tablecontent-row white" v-if="categories">
            <table>
                <thead>
                    <tr>
                        <th width="280">Field</th>
                        <th width="280">Filter</th>
                        <th width="280">Value</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(category, index) in categories">
                        <td>
                            <select v-model="category.field">
                                <option v-for="field in fields" :value="field">{{field}}</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="category.filter">
                                <option v-for="filter in filters" :value="filter">{{ filter }}</option>
                            </select>
                        </td>
                        <td><input type="text" v-model="category.value"></td>
                        <td>

                            <!--<input type="text" v-model="category.category_id">-->
                            <autocomplete v-if="category.category" name="label"
                                           url="/search_categories/FeedBeslist/"
                                           anchor="label"
                                           label="name"
                                            :entity="entity"
                                           :index="index"
                                           :initValue="category.category.label"
                                           :on-select="getData"></autocomplete>
                            <autocomplete v-else name="label"
                                          url="/search_categories/FeedBeslist/"
                                          anchor="label"
                                          label="name"
                                          :entity="entity"
                                          :index="index"
                                          :on-select="getData"></autocomplete>
                        </td>
                    </tr>

                </tbody>
            </table>

        </div>

        <div class="panel-row no_entries white" v-else>
            No categories set
        </div>
        <div class="panel-row actionfooter">
            <input type="submit" class="btn btn-primary" value="New category" @click="addCategory">
        </div>
    </div>

</template>

<script>
    import autocomplete from './autocomplete.vue';
    import autocomplete2 from './autocomplete.vue';

    export default {
        components: {
            'autocomplete': autocomplete,
            'autocomplete2': autocomplete2
        },
        props: [ 'id', 'fields', 'filters','entity'],
        data: function () {
            return {
                ///running: false,
                categories: '',
                main_category: '',
                category_id: null
            }
        },
        mounted () {

            axios.get('/feeds/' + this.id + '/get_categories')
                .then(function (response) {
                    this.categories = response.data;
                }.bind(this));

            axios.get('/feeds/' + this.id + '/get_main_category')
                .then(function (response) {
                    this.main_category = response.data;
                }.bind(this));


        },
        computed (){

        },
        methods: {
            getData (response, index) {
                 this.categories[index].category_id = response.id;
            },
            setMain (response) {
                axios.post('/feeds/' + this.id + '/post_main_category', response)
                    .then(function (response) {
                    });
            },
            addCategory(){
                axios.get('/feeds/' + this.id + '/new_category')
                    .then(function (response) {
                        this.categories = response.data;
                    }.bind(this));
            }
        },
        watch: {
            // whenever question changes, this function will run
            categories: {
                handler: function (val, oldVal) {

                    axios.post('/feeds/' + this.id + '/post_categories', val)
                        .then(function (response) {
                        });
                },

                deep: true
            }
        },
        ready () {

        }
    }
</script>

<style>

    .transition, .autocomplete, .showAll-transition, .autocomplete ul, .autocomplete ul li a{
        transition:all 0.3s ease-out;
        -moz-transition:all 0.3s ease-out;
        -webkit-transition:all 0.3s ease-out;
        -o-transition:all 0.3s ease-out;
    }

    .autocomplete ul{
        font-family: sans-serif;
        position: absolute;
        list-style: none;
        background: #f8f8f8;
        padding: 10px 0;
        margin: 0;
        display: inline-block;
        min-width: 15%;
        margin-top: 10px;
    }

    .autocomplete ul:before{
        content: "";
        display: block;
        position: absolute;
        height: 0;
        width: 0;
        border: 10px solid transparent;
        border-bottom: 10px solid #f8f8f8;
        left: 46%;
        top: -20px
    }

    .autocomplete ul li a{
        text-decoration: none;
        display: block;
        background: #f8f8f8;
        color: #2b2b2b;
        padding: 5px;
        padding-left: 10px;
    }

    .autocomplete ul li a:hover, .autocomplete ul li.focus-list a{
        color: white;
        background: #2F9AF7;
    }

    .autocomplete ul li a span{
        display: block;
        margin-top: 3px;
        color: grey;
        font-size: 13px;
    }

    .autocomplete ul li a:hover span, .autocomplete ul li.focus-list a span{
        color: white;
    }

    .showAll-transition{
        opacity: 1;
        height: 50px;
        overflow: hidden;
    }

    .showAll-enter{
        opacity: 0.3;
        height: 0;
    }

    .showAll-leave{
        display: none;
    }
</style>