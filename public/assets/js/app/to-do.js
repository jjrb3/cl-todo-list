
Api.Todo = {
    uri: `${ Api.apiServer}/to-do`,

    loadData: function() {

        Api.User.loadDataSelect('select-users');
        Api.Status.loadDataSelect('select-status');
    },


    addTodo: function() {

        let params = this.verifyForm();

        if (params) {

            $.ajax({
                url: this.uri,
                type: 'post',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': localStorage.getItem('auth')
                },
                dataType: 'json',
                beforeSend: function(){
                    $('#message').html('<img src="assets/img/loading.gif" width="50" height="50">');
                },
                success: function (json) {

                    if (json.success) {
                        localStorage.setItem("auth", json.token);
                        localStorage.setItem("name", json.user.name);
                        location.assign(`${ Api.server}/home`)
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Api.Tools.publicMessage('danger', 'message',XMLHttpRequest.responseJSON.err.message);
                }
            });
        }
    },


    verifyForm: function() {

        let description = $('#description-to-do').val().trim(),
            user = $('#select-users').val().trim(),
            status = $('#select-status').val();

        if (!description) {
            Api.Tools.publicMessage('warning', 'message','Description is required');
            return false;
        }

        if (!status) {
            Api.Tools.publicMessage('warning', 'message','Status is required');
            return false;
        }

        return {
            description: description,
            status: status,
            user: user
        };
    },
};

//mark task as done
function done(doneItem){
    var done = doneItem;
    var markup = '<li>'+ done +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
    $('#done-items').append(markup);
    $('.remove').remove();
}

//mark all tasks as done
function AllDone(){
    var myArray = [];

    $('#sortable li').each( function() {
        myArray.push($(this).text());
    });

    // add to done
    for (i = 0; i < myArray.length; i++) {
        $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
    }

    // myArray
    $('#sortable li').remove();
    countTodos();
}

//remove done task from list
function removeItem(element){
    $(element).parent().remove();
}