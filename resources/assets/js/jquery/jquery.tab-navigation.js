jQuery(function($){

    $('.tab-link').click(function(){
        $('.tab-content-panel').removeClass('active');
        $('.tab-link').removeClass('active');
        $(this).addClass('active');

        var activePanel = $(this).attr('href').replace('#','');
        $('#'+activePanel).addClass('active');
    });

});