/*jslint white:false */
/*globals W, C, Glob:true */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function Glob(name, desc) {
    var self = this,
        parent = self.constructor || self;

    parent.noms = parent.noms || {};
    parent.objs = parent.objs || {};
    parent.inc();

    name = (name || 'Glob');
    desc = (desc || 'I’m from a lazy sod!');

    if (name in parent.objs) {
        name = (name + ':@' + parent.inc); // force unique id
    }
    self['.'] = name;
    self['..'] = parent;

    parent.noms[name] = null;
    parent.objs[name] = self;

    W.debug > 0 && C.log('create',  self, desc);
}

Glob.addCounter = function (obj, nom) { // love this
    var num = -1,
        mod = Infinity,
        inc;

    obj = obj || this;
    inc = obj[nom || 'inc'] = function () { // always internally "inc"
        num++;
        return inc.valueOf();
    };
    inc.valueOf = function () {
        return num % mod;
    };
    inc.limitTo = function (num) {
        mod = Math.abs(parseInt(num)) || Infinity;
        return inc;
    };
    inc.reset = function () {
        num = 0;
        return inc;
    };
    return inc;
};

Glob.prototype.addCounter = Glob.addCounter;
Glob.prototype.isInited = function (b) {
    var all, name;

    all = this['..'].noms;
    name = this['.'];

    if (all[name]) {
        if (b) C.error('double init', name);
        return true;
    } else {
        if (b) { // first run, so just say no
            W.debug > 0 && C.debug('inited', name);
            all[name] = true;
        } else { // affirmations only!
            throw new Error(name + ' not inited');
        }
        return false;
    }
};
Glob.prototype.valueOf = function () {
    return this['.'];
};

Glob.addCounter();
Glob = new Glob();
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
