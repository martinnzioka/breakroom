const Accesscontrol = require('accesscontrol');
const ac = new Accesscontrol();

// Roles for this application/API.
exports.roles = ( function() {
    ac.grant('user').createOwn('gif').readOwn('gif').updateOwn('gif')
    ac.grant('supervisor').extend('user').readAny('gif')
    ac.grant('admin').extend(['supervisor', 'user']).updateAny('gif').deleteAny('gif')
    return ac;
})();