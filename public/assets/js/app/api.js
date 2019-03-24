

let Api = {
    apiServer: 'http://localhost:3000/api',
    server: 'http://localhost:3000',

    securityLogin: function() {

        if (localStorage.getItem("auth") === null) {
            location.assign(this.server)
        }
    },

    ifIsLogin: function() {
        if (!(localStorage.getItem("auth") === null)) {
            location.assign(`${ this.server }/home`)
        }
    },

    logout: function() {
        localStorage.clear();
        location.assign(this.server);
    },

    loadData: function() {

        if (!(localStorage.getItem("name") === null)) {
            $('#user-name').html(localStorage.getItem("name"))
        }
    }
};