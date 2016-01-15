define(['Views/AddView', 'Models/User'], function (AddView, User) {

    function start() {
        AddView.render();
        bindEvents();
    }

    function bindEvents() {
        var ok = '\v' != 'v';

        document.getElementById('add')[ok ? 'addEventListener' : 'attachEvent'](ok ? 'click' : 'onclick', function () {
            var users = JSON.parse(localStorage.users);
            var userName = document.getElementById('user-name').value;
            users.push(new User(userName));
            localStorage.users = JSON.stringify(users);
            window.location.hash = '#list';
        }, false);
    }

    return {
        start: start
    };
});
