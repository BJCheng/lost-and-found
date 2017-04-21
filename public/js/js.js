$(function(){
    $(".nav > li").each(function(){
        let tabName = $(this).children('a').html()
        let pageName = $(".page-header").html();

        if(tabName.toUpperCase() === pageName.toUpperCase()){
            $(this).toggleClass('active', !$(this).hasClass('active'));
        }
        // {
        //     $(this).addClass('active');
        // }
        // $(this).addClass('active');
    });
});