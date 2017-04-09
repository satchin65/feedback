<template>

        <a href="javascript:void(0)" :class="buttonClass" v-on:click="startImport">
            <i :class="theClass"
            ></i> {{ label }}
        </a>

</template>


<script>
    import Echo from "laravel-echo"

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'db74dca0a1cfb9e186c0',
        cluster: 'eu'
    });

    export default{
        props: [ 'id', 'running', 'inactive' ],
        data: function () {
            return {
                ///running: false,
                label: 'Import',
                status: this.running,
                theClass: 'glyphicon glyphicon-refresh',
                buttonClass: 'btn btn-gray btn-small',
                importChecker: ''
            }
        },
        mounted: function () {
              if(this.inactive == true)
                  this.setInactive();

              if(this.status == 1)
                this.setRunning();

            this.listen();
        },
        methods: {
            listen: function () {
                console.log('starting to listen ' + 'connection.' + this.id + '.status');
                window.Echo.private('connection.' + this.id + '.status')
                    .listen('FinishedProductImport', event => {
                        if(event.status == 'running')
                            this.setRunning();
                        if(event.status == 'finished')
                            this.setFinished();
                        if(event.status == 'failed')
                            this.setFailed();
                    });
            },

            startImport: function () {
                if(this.inactive == 0 && this.status == 0)
                {
                    this.importChecker = axios.get('/connections/' + this.id +'/start_import');
                    this.setWaiting();
                }
            },
            setWaiting(){
                this.status = 1;
                this.label = 'Waiting';
                this.theClass = 'glyphicon glyphicon-refresh-spin';
            },
            setRunning(){
                this.status = 1;
                this.label = 'Running';
                this.theClass = 'glyphicon glyphicon-refresh-spin';
            },
            setFinished(){
                this.status = 0;
                this.label = 'Import';
                this.theClass = 'glyphicon glyphicon-refresh';
            },
            setFailed(){
                this.status = 0;
                this.label = 'Import failed';
                this.theClass = 'glyphicon glyphicon-warning-sign';
            },
            setInactive(){
                this.theClass = 'glyphicon glyphicon-pause';
                this.buttonClass = 'btn btn-gray btn-small disabled';
                this.label = 'Inactive';
            }
        }
    }
</script>