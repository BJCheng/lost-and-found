function postArticle(type) {

    var action = "";
    var title = "";

    if (type === 'lost') {
        action = '/lost';
        title = 'Lost';
    } else {
        action = '/found';
        title = 'Found';
    }

    var $form = $(`<form id="articleForm" action="${action}" method="post"></form>`);
    var $title = $('<div class="form-group"> <label for="title">Title</label> <input id="title" name="title" class="form-control" /> </div>');
    var $location = $('<div class="form-group"> <label for="location">Location</label> <input id="location" name="location" class="form-control" /> </div>');
    var $description = $('<div class="form-group"> <label for="description">Description</label> <input id="description" name="description" class="form-control" /> </div>');
    var $hiddenBtn = $('<input type="submit" id="submit-form" class="hidden" />');

    $form.append($title);
    $form.append($description);
    $form.append($location);
    $form.append($hiddenBtn);

    BootstrapDialog.show({
        title: `Report A ${title}`,
        message: $form,
        buttons: [{
            id: 'dialogSubmit',
            label: 'Post',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            label: 'Cancel',
            action: function (dialogRef) {
                dialogRef.close();
            }
        }],
        onshow: function (dialogRef) {
            // using html5 attr to inherit the submit function from within the form
            var $dialogPostBtn = dialogRef.getButton("dialogSubmit");
            $dialogPostBtn.attr('form', 'articleForm');
        },
    });
};

function askLoginFirst() {
    BootstrapDialog.show({
        title: 'Please Login',
        message: 'Please Login to Proceed',
        buttons: [
            {
                label: 'Take Me',
                cssClass: 'btn-primary',
                action: function (dialogRef) {
                    window.location.href = '../login'
                }
            },
            {
                label: 'Never Mind',
                cssClass: 'btn-default',
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }
        ]
    });
}