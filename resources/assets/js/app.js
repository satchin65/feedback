window.axios = require('axios');
window.$ = window.jQuery = require('jquery');
window.easyAutocomplete = require('easy-autocomplete');
import hljs from 'highlight.js';


hljs.initHighlighting();

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest'
};

import Vue from 'vue';
import Axios from 'axios';

import VueCharts from 'vue-chartjs';

import ProductImportRun from './components/ProductImportRun.vue';
import accountSettingsForm from './components/accountSettingsForm.vue';
import StatsProducts from './components/Stats_Products.vue';
import StatsOrders from './components/Stats_Orders.vue';
import InviteUser from './components/InviteUser.vue';
import FeedCategories from './components/FeedCategories.vue';
import SearchCategories from './components/SearchCategories.vue';

import Form from './utilities/Form';

window.Form = Form;




Vue.prototype.$http = Axios;

new Vue ({

    el: '#app',

    components: {
        'productimportrun': ProductImportRun,
        'accountsettingsform': accountSettingsForm,
        'statsproducts': StatsProducts,
        'statsorders': StatsOrders,
        'inviteuser': InviteUser,
        'feed_categories': FeedCategories,
        'search_categories': SearchCategories,
    }


});

/*
Vue.nextTick(function () {
    var options = {
        url: "/search_categories/FeedBeslist",

        getValue: "label",

        list: {
            match: {
                enabled: true
            }
        }
    };


    $(".provider-json").easyAutocomplete(options);

});*/



/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

  // require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));

// const app = new Vue({
//     el: '#app'
// });
