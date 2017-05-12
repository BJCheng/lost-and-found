$(function () {
    var tabMap = $("#tabMap");
    tabMap.click(function (event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('href')
            , success: function (response) {
                var withIFrame = '<iframe id="mapIFrame" height="400px" width="100%" frameBorder="0" scrolling="no" src="views/googlemap.html" allowfullscreen>'+response+'</iframe>';
                // alert(withIFrame);
                $("#tabContent").html(withIFrame);
            }
        })
        return false;
    });
});

$(function () {
    var tabFound = $("#tabFound");
    tabFound.click(function (event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('href')
        }).then(function(res){
            $("#tabContent").html(res);
        })
    })
    return false;
});

$(function () {
    var tabFound = $("#tabLost");
    tabFound.click(function (event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('href')
        }).then(function(res){
            $("#tabContent").html(res);
        })
    })
    return false;
});