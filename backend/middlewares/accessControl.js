const { roles } = require('../roles');

exports.grantAcces = function(action, resource) {
    return async (req, res, next) => {
        try{
            const permission = roles.can(req.user.userrole)[action](resource);
            if (!permission.granted) return res.status(401).json({
                message: "You don't have enough permission to perform this action."
            });
            next()
        } catch (error) {
            next(error)
        }
    }
}

exports.allowIfLoggedIn = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user) return res.status(401).json({
            message: 'You need to be logged in to access this.',
        });
        req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}