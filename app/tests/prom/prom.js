/*global fetch, Promise */

function perchance() {
    return (Math.random() * 101 | 0); // 0 - 100 equal chances
}
function chance(num) {
    return Boolean(perchance() <= (num || 50));
}
function relay(fn, sec) {
    var cb = fn;

    if (sec === (sec | 0)) {
        sec -= 1;
        cb = function () {
            console.info('relay', sec + 1);
            fn();
        };
    }
    return setTimeout(cb, sec * 1e3);
}
function mock(fn) {
    return relay(fn, Math.random());
}
function toss(fn1, fn2) {
    mock(perchance() < 50 ? fn1 : fn2);
}
function flip(nom) {
    return new Promise(function (res, rej) {
        toss(function () {
            res('res ' + nom);
        }, function () {
            rej('rej ' + nom);
        });
    });
}
function fetching(msg, rsp) {
    rsp.json().then(function (obj){
        console.debug(msg + '...fetched', obj);
        return obj;
    });
    return ('fetching...' + msg);
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

    task.then(function (rez) {
        console.log('fn1 //', [rez], 'Do something with the result :)');
    }).catch(function (err) {
        console.warn('fn1 //', [err], 'Coin flipped...shit happens :(');
    });
}

// It's up to the developer to manually call resolve or reject within
// the body of the callback based on the result of their given task.

function fn2() {
    // Return a new promise.
    function get(url) {
        return new Promise(function (res, rej) {
            var req = new XMLHttpRequest(); // Do the usual XHR stuff

            req.open('get', url);

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

            req.send(); // Make the request
        });
    }

    // Use it!
    get('data/story.json').then(function (rsp) {
        console.log('fn2 // Success!', JSON.parse(rsp));
    }, function (error) {
        console.warn('fn2 // Failed!', error);
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
            .then(function (rsp) {
                return rsp.json(); // Convert to JSON
            }).then(function (rez) {
                userCache[username] = rez.lastName;
                console.log('fn3 // userCache', userCache);
                return rez;
            }).catch(function () {
                throw new Error('Could not find user: ' + username);
            });
    }

    console.log('fn3 // bob0', getUserDetail('bob0'));
    console.log('fn3 // bob1', getUserDetail('bob1'));
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// THEN

function fn4() {
    new Promise(function (res) {
        mock(function () {
            res(10);
        });
    }).then(function (rez) {
        console.log('fn4 // Bo Derick?', rez);
    });
}

function fn5() {
    new Promise(function (res, rej) {
        mock(function () {
            res(2);
        });
    }).then(function (num) {
        console.log('fn5 // take ' + num + ' then double it');

        return num * 2;
    }).then(function (num) {
        console.log('fn5 // then double it', num);

        return num * 2;
    }).then(function (num) {
        console.log('fn5 // and finally?', num);
    });
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// CATCH

function fn6() {
    new Promise(function (res, rej) {
        mock(function () {
            rej(new Error('Failure achieved!'));
        });
    }).then(function () {
        console.log('fn6 // then1', arguments);
    }).catch(function (err) {
        console.log('fn6 // catch: ', err);
    }).then(function () {
        console.log('fn6 // then2', arguments);
    });
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// ALL

function fn7() {
    // firing off multiple requests at one time:
    var prom1 = fetch('data/bob1.json');
    var prom2 = fetch('data/story.json');

    // prom1 = Promise.reject({statusText: 'fake respose 1'});
    prom2 = Promise.resolve({statusText: 'fake respose 2'});

    Promise.all([prom1, prom2]).then(function (rez) {
        console.log('fn7 // resolutions', arguments); // fetches "done"
        console.log(fetching('fn7 // response 1 json', rez[0]));
        console.log('fn7 // response 2 status', rez[1].statusText);
    }).catch(function (err) {
        console.warn('fn7 // 1 or more promise rejected', err);
    });;
}

function fn8() {
    // catch fires for the first rejection:
    var prom1, prom2;

    prom1 = flip('prom1');
    prom2 = flip('prom2');

    Promise.all([prom1, prom2]).then(function () {
        console.log('fn8 // All resolved:', arguments);
    }).catch(function () {
        console.warn('fn8 // 1st reject:', arguments);
    });
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// RACE
// triggers as soon as any promise is resolved or rejected:

function fn9() {
    var prom1, prom2;

    prom1 = flip('prom1');
    prom2 = flip('prom2');

    Promise.race([prom1, prom2]).then(function () {
        console.log('fn9 // 1st resolved:', arguments);
    }).catch(function () {
        console.warn('fn9 // 1st rejected:', arguments);
    });

    // From the console:
    // Then: Second!

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function fn() {
    relay(fn1, 1);
    relay(fn2, 2);
    relay(fn3, 3);
    relay(fn4, 4);
    relay(fn5, 5);
    relay(fn6, 6);
    relay(fn7, 7);
    relay(fn8, 8);
    relay(fn9, 9);
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
