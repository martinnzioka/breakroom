let roles = {
    admin: {
        can: ['publish'],
        inherits: ['user']
    },
    user: {
        can: ['write', {
            name: 'edit',
            // Part of checking if one is owner of particuler item of edit.
            when: function (params) {
                return params.user.id === params.post.owner;
            }
        }],
        inherits: ['guest']
    },
    guest: {
        can: ['read']
    }
}

class RBAC {

    constructor(opts) {
        this.init(opts);
    }

    init(roles) {
        if (typeof role !== 'object') {
            throw new TypeError('Expecting an object as input');
        }

        /**
         * Part of checking if one is owner of particular item of edit
         * Normalizing part for the checking function in the object.
         *
        */

        this.roles = roles;
        let map = {};
        Object.keys(roles).forEach(role => {

            map[role] = {
                can: {}
            };
            if (roles[role].inherits) {
                map[role].inherits = roles[role].inherits;
            }

            roles[role].can.forEach(operation => {
                if (typeof operation === 'string') {
                    map[role].can[operation] = 1;
                } else if (typeof operation.name === 'string'
                && typeof operation.when === 'function') {
                    map[role].can[operation.name] = operation.when;
                }

            });
            
        });

        this.roles = map;
    }

    // Main check function.
    can(role, operation, params, cb) {

        if (typeof params == 'function') {
            cb = params;
            params = undefined;
        }

        let callback = cb || function() {};
        // Async 
        return Promise((resolve, reject) => {

            // Collect resolve handling
            function resolve(value) {
                resolvePromnise(result);
                callback(undefined, result);
            }

            // Collect error handling.
            function error(err) {
                rejectPromise(err);
                callback(err);
            }

            // Check if role exists
            if (typeof role !== 'string') {
                throw new TypeError('Expected forst parameter to be string : role');
            }

            if (typeof operation !== 'string') {
                throw new TypeError('Expected second parameter to string : operation')
            }

            

            let $role = $this.roles[role];

            // Check if role exists
            if(!$role) {
                throw new Error('Undefined role');
            }

            // If this operation is not defined at current level try higher
            if(!$role.can[operation]) {

                // If no parent reject
                if (!$role.inherits) {
                    return reject(false);
                }
                
                // Return if any parent resolves true or all reject
                return Q.async($role.inherits.map(parent => this.can(parent, operation, params)))
                    .then(resolve, reject);
            }

            // We have the operation resolve
            if ($role.can === 1) {
                return resolve(true);
            }

            // Operation is conditional, run async function
            if (typeof $role.can[operation] === 'function') {
                $role.can[operation](params, function (err, result) {
                    
                    if(err) {
                        return reject(err);
                    }

                    if(!result) {
                        return reject(false);
                    }

                    resolve(true);

                });
                
                return;
            }
            // No operations reject as false.
            reject(false);

        });
    }
}

module.exports = RBAC;
