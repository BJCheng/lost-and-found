function sendDelete(type, id) {

    var url = "";
    if(type === 'lost')
        url = '/lost';
    else
        url = '/found';

    $.ajax({
        url: url,
        type: 'DELETE',
        data: { 'articleId': id },
        success: function (result) {
            if (typeof result.redirect == 'string') {
                window.location = result.redirect;
            }
        }
    });
};
