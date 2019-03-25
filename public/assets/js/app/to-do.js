
Api.Todo = {
    uri: `${ Api.apiServer}/to-do`,

    loadData: function() {

        Api.User.loadDataSelect('select-users');
        Api.Status.loadDataSelect('select-status');

        this.showTable();
    },

    showTable: function() {

        $.ajax({
            url: this.uri,
            type: 'get',
            data: {},
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

                    let tbody = $('#table-to-do').find('tbody');

                    tbody.html('');

                    for (let i in json.todo) {

                        var tr = '',
                            selectUser = '',
                            selectStatus = '',
                            checkoutUser = '',
                            checkoutStatus = 'false';

                        tr += '<tr>';
                        tr += `<td>${ json.todo[i].description }</td>`;


                        // Select User
                        var data = `'${ json.todo[i]._id }', '${ json.todo[i].description }', '${ json.todo[i].status._id }',`;
                        data += `'${ json.todo[i].user === undefined ? '' : json.todo[i].user._id }'`;

                        selectUser += `<select class="form-control" onchange="Api.Todo.Update(${ data }, this.value, 'user')">`;

                        selectUser += `<option value="">Select an user...</option>`;

                        for (let j in Api.User.userList) {

                            if (!(json.todo[i].user === undefined) && Api.User.userList[j]._id === json.todo[i].user._id) {
                                checkoutUser = 'selected';
                            }
                            else {
                                checkoutUser = '';
                            }

                            selectUser += `<option ${ checkoutUser } value="${ Api.User.userList[j]._id }">${ Api.User.userList[j].name }</option>`;
                        }

                        selectUser += '</select>';

                        tr += `<td width="30%">${ selectUser }</td>`;

                        // Select Status
                        selectStatus += `<select class="form-control" onchange="Api.Todo.Update(${ data }, this.value, 'status')">`;

                        for (let j in Api.Status.statusList) {

                            if (Api.Status.statusList[j]._id === json.todo[i].status._id) {
                                checkoutUser = 'selected';
                            }
                            else {
                                checkoutUser = '';
                            }

                            selectStatus += `<option ${ checkoutUser } value="${ Api.Status.statusList[j]._id }">${ Api.Status.statusList[j].name }</option>`;
                        }

                        selectStatus += '</select>';

                        tr += `<td width="30%">${ selectStatus }</td>`;
                        tr += `<td width="5%"><button class="btn btn-danger" onclick="Api.Todo.Delete('${ json.todo[i]._id }')">Delete</button></td>`;


                        tr += '<tr>';

                        tbody.append(tr);
                    }
                }

                $('#message').html('');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseJSON.err.message)
            }
        });
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

                        $('#description-to-do').val('');

                        Api.Tools.publicMessage('success', 'message', 'The information was saved correctly');

                        setTimeout(function() {
                            Api.Todo.loadData();
                        }, 1000);
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