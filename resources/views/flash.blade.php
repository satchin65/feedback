@if(session()->has('flash_message'))
    <script>
        swal({
             title: "{{ session('flash_message.title') }}",
             text: "{{ session('flash_message.message') }}",
             @if(session('flash_message.type'))
                type: "{{ session('flash_message.type') }}",
             @endif
             timer: 2000,
             showConfirmButton: false
         });
    </script>
@endif