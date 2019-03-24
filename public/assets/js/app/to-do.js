
Api.Todo = {
    uriLoadData: `${ Api.apiServer}/load-data-form`,

    loadData: function() {
        $.ajax({
            url: this.uri,
            type: 'post',
            data: params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            dataType: 'json',
            beforeSend: function(){
                console.log('Loading')
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
    },

    addTodo: function() {
        let description = $('#description-to-do').val();

        if (description) {
            console.log('Added');
        }
    }
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