<template>
    <div>
    <transition name="modal">
        <div v-if="showModal" @close="showModal = false">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <form action="/settings/users/invite" method="post">
                        <input type="hidden" name="_token" :value="csrf">
                        <div class="flexform"><div class="form-group">
                                <label for="name">{{ firstnamelabel }}</label>
                                <input type="text" name="firstname" required :placeholder="firstnamelabel">

                            </div>

                            <div class="form-group">
                                <label for="name">{{ lastnamelabel }}</label>
                                <input type="text" name="lastname" required :placeholder="lastnamelabel">
                            </div>

                            <div class="form-group">
                                <label for="name">{{ emaillabel }}</label>
                                <input type="text" name="email" required :placeholder="emaillabel">
                            </div>

                            <div class="form-group">
                                <label for="name">{{ levellabel }}</label>
                                <select name="role" id="">
                                    <option value="1">Admin</option>
                                    <option value="2">Manager</option>
                                </select>
                            </div>
                        </div>

                        <input type="submit" class="btn btn-primary" value="Invite user">

                        </form>


                    </div>
                </div>
            </div>
        </div>
    </transition>
    <button id="show-modal" class="btn btn-primary" @click="showModal = true">Invite new user</button>
    </div>

</template>

<script>
    export default {
        props: [ 'firstnamelabel', 'lastnamelabel', 'emaillabel', 'levellabel', 'csrf' ],
        data: function () {
            return {
                showModal: false
            }
        },
    }
</script>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .5s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }

    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>