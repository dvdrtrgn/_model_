/*global fetch, Promise */

function perchance() {
    return (Math.random() * 101 | 0); // 0 - 100 equal chances
}
function chance(num) {
    return Boolean(perchance() <= (num || 50));
}
function mock(fn) {
    return setTimeout(fn, Math.random() * 999);
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// BASICS

function fn1() {

    var task = new Promise(function (res, rej) {
        // Do an async task async task and then...
        mock(function () {
            if (chance()) {
                res('resolving:');
            } else {
                rej('rejecting:');
            }
        });
    });

    task.then(function (a) {
        console.log('fn1 //', [a], 'Do something with the result :)');
    }).catch(function (a) {
        console.log('fn1 //', [a], 'Coin flipped...shit happens :(');
    });
}
// It's up to the developer to manually call resolve or reject within
// the body of the callback based on the result of their given task.
function fn2() {

    // Return a new promise.
    function get(url) {
        return new Promise(function (res, rej) {

            var req = new XMLHttpRequest(); // Do the usual XHR stuff
            req.open('GET', url);

            req.onload = function () {
                // This is called even on 404 etc so check the status
                if (req.status === 200) {
                    // Resolve the promise with the response text
                    res(req.response);
                } else {
                    // Otherwise reject with hopefully a meaningful error
                    rej(Error(req.statusText));
                }
            };
            req.onerror = function () {
                rej(Error('Network Error'));
            };
            // Make the request
            req.send();
        });
    }

    // Use it!
    get('data/story.json').then(function (response) {
        console.log('fn2 // Success!', response);
    }, function (error) {
        console.error('fn2 // Failed!', error);
    });
}
// Sometimes you don't need to complete an async tasks within the promise
function fn3() {

    var userCache = {
        bob0: 'Roberts'
    };

    function getUserDetail(username) {
        // In both cases, cached or not, a promise will be returned

        if (userCache[username]) {
            // Return a promise without the "new" keyword
            return Promise.resolve(userCache[username]);
        }

        // Use the fetch API, it returns a promise
        return fetch('data/' + username + '.json')
            .then(function(response) {
                return response.json(); // Convert to JSON
            }).then(function (result) {
                userCache[username] = result.lastName;
                console.log('fn3 // userCache', userCache);
                return result;
            })
            .catch(function () {
                throw new Error('Could not find user: ' + username);
            });
    }

    console.log('fn3 // bob0', getUserDetail('bob0'));
    console.log('fn3 // bob1', getUserDetail('bob1'));
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// THEN

function fn4() {
    new Promise(function (resolve) {
        mock(function () {
            resolve(10);
        });
    })
        .then(function (result) {
            console.log('fn4 // Bo Derick?', result);
        });
}

function fn5() {
    new Promise(function (resolve, reject) {
        mock(function () {
            resolve(2);
        });
    })
        .then(function (num) {
            console.log('fn5 // take ' + num + ' then double it');
            return num * 2;
        })
        .then(function (num) {
            console.log('fn5 // then double it', num);
            return num * 2;
        })
        .then(function (num) {
            console.log('fn5 // and finally?', num);
        });
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// CATCH
function fn6() {

    new Promise(function (resolve, reject) {
        mock(function () {
            reject('Failure achieved!');
        });
    })
        .catch(function (e) {
            console.log('fn6 // catch: ', e);
        });
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
fn1();
fn2();
fn3();
fn4();
fn5();
fn6();
