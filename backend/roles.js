/**
 * 1. Use a real-time database/storage/cache solution to make the roles avaialble 'all' the time.
 */

const Accesscontrol = require('accesscontrol');
const ac = new Accesscontrol();

// Roles for this application/API.
exports.roles = ( function() {
    ac.grant('user').createOwn('fu-relation').readOwn('fu-relation').updateOwn('fu-relation')
    ac.grant('supervisor').extend('user').readAny('fu-relation')
    ac.grant('admin').extend(['supervisor', 'user']).updateAny('fu-relation').deleteAny('fu-relation')
    return ac;
})();