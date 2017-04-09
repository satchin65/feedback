

jQuery(document).ready(function() {
    jQuery('.account_block').click(function() {
        if(jQuery('.dropsubmenu').hasClass('active')) {
            jQuery('.dropsubmenu').removeClass('active');
        }else{
            jQuery('.dropsubmenu').addClass('active');
        }
    });

    jQuery('.storeselect').click(function() {
        if(jQuery('.dropsubmenustores').hasClass('active')) {
            jQuery('.dropsubmenustores').removeClass('active');
        }else{
            jQuery('.dropsubmenustores').addClass('active');
        }
    });

});