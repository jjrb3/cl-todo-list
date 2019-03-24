
Api.Login = {
    uri: `${ Api.apiServer}/login`,

    login: function() {

        let params = this.verifyForm();

        if (params) {

            $.ajax({
                url: this.uri,
                type: 'post',
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
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

        var user = $('#email').val().trim();
        var pass = $('#password').val();

        if (!user) {
            Api.Tools.publicMessage('warning', 'message','Email address is required');
            return false;
        }

        if (!pass) {
            Api.Tools.publicMessage('warning', 'message','Password is required');
            return false;
        }

        return {
            email: user,
            password: pass
        };
    },
};