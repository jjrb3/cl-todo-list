
Api.Status = {
    uri: `${ Api.apiServer}/status`,
    statusList: null,

    loadDataSelect: function(id) {
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
                console.log('Loading')
            },
            success: function (json) {

                if (json.success) {

                    let selector = `.${ id }`;

                    $(selector).html('');

                    $(selector).append(
                        $('<option>',{
                            value: '',
                            text: 'Select status...'
                        })
                    );

                    for (let k in json.status) {
                        $(selector).append(
                            $('<option>', {
                                value: json.status[k]._id,
                                text: json.status[k].name
                            })
                        );
                    }

                    Api.Status.statusList = json.status;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseJSON.err.message)
            }
        });
    }
};