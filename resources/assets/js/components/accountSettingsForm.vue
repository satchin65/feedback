<template>
    <div>aaaaaaaa</div>
</template>

<script>
    export default{
        props: ['account'],
        data(){
            return{
                accountdetails: this.account
            }
        },
        mounted(){
            console.log(this.accountdetails.id);
        }
    }

</script>