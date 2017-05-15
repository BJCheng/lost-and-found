$(function () {
    var tabMap = $("#tabMap");
    tabMap.click(function (event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('href')
            , success: function (response) {
                var $iFrame = $('<iframe id="mapIFrame" height="400px" width="100%" frameBorder="0" allowfullscreen></iframe>');
                $iFrame.attr('scrolling', 'no');
                $iFrame.attr('src', 'views/googlemap.html');
                $iFrame.append(response);
                // alert(withIFrame);
                $("#tabContent").html($iFrame);
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