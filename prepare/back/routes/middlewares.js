exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        // next(error); // -> process error
        next(); // go to next middleware
    } else {
        res.status(401).send('You need to Log In');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        // next(error); // -> process error
        next(); // go to next middleware
    } else {
        res.status(401).send('You can not access with login');
    }
};