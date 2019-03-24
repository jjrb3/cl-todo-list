
Api.User = {
    uri: `${ Api.apiServer}/user`,
    userList: null,

    loadDataSelect: function(id) {
        $.ajax({
            url: this.uri,
            type: 'get',
            data: {from: 0, limit: 100},
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

                    let selector = `#${ id }`;

                    $(selector).html('');

                    $(selector).append(
                        $('<option>',{
                            value: '',
                            text: 'Select an user...'
                        })
                    );

                    for (let k in json.user) {
                        $(selector).append(
                            $('<option>',{
                                value: json.user[k]._id,
                                text: json.user[k].name
                            })
                        );
                    }

                    Api.User.userList = json.user
                }

                $('#message').html('');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseJSON.err.message)
            }
        });
    }
};