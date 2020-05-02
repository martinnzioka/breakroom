const Accesscontrol = require('accesscontrol');
const ac = new Accesscontrol();

// Roles for this application/API.
exports.roles = ( function() {
    ac.grant('user').readOwn('profile').updateOwn('profile')
    ac.grant('supervisor').extend('user').readAny('profile')
    ac.grant('admin').extend('supervisor').extend('user').updateAny('profile').deleteAny('profile')
    return ac;
})();