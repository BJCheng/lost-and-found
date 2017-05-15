function postFound() {
    var $form = $('<form id="foundForm" action="/found" method="post"></form>');
    var $title = $('<div class="form-group"> <label for="foundTitle">Title</label> <input id="foundTitle" name="title" class="form-control" value="" /> </div>');
    var $description = $('<div class="form-group"> <label for="foundDescription">Description</label> <input id="foundDescription" name="description" class="form-control" value="" /> </div>');
    var $hiddenBtn = $('<input type="submit" id="submit-form" class="hidden" />');

    $form.append($title);
    $form.append($description);
    $form.append($hiddenBtn);

    BootstrapDialog.show({
        title: 'Report a Found',
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
            var $dialogPostBtn = dialogRef.getButton("dialogSubmit");
            $dialogPostBtn.attr('form', 'foundForm');
        },
    });
};